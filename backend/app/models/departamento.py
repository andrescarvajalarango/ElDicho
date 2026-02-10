"""Departamento (Colombian department) model."""

import uuid

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Departamento(Base):
    __tablename__ = "departamentos"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    name: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    code: Mapped[str] = mapped_column(String(3), unique=True, index=True)
    region: Mapped[str] = mapped_column(String(50), index=True)

    # Relationships
    dichos: Mapped[list["Dicho"]] = relationship(back_populates="departamento")  # noqa: F821
