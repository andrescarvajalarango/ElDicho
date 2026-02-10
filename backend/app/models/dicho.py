"""Dicho (Colombian saying) model."""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Dicho(Base):
    __tablename__ = "dichos"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    text: Mapped[str] = mapped_column(Text)
    meaning: Mapped[str | None] = mapped_column(Text, nullable=True)
    author: Mapped[str | None] = mapped_column(String(100), nullable=True)
    is_anonymous: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        index=True,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Foreign keys
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), index=True
    )
    departamento_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("departamentos.id"), index=True
    )

    # Relationships
    user: Mapped["User"] = relationship(back_populates="dichos")  # noqa: F821
    departamento: Mapped["Departamento"] = relationship(back_populates="dichos")  # noqa: F821
    likes: Mapped[list["Like"]] = relationship(
        back_populates="dicho", cascade="all, delete-orphan"
    )
    comments: Mapped[list["Comment"]] = relationship(
        back_populates="dicho", cascade="all, delete-orphan"
    )
    shares: Mapped[list["Share"]] = relationship(
        back_populates="dicho", cascade="all, delete-orphan"
    )
