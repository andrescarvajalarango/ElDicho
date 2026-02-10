"""Like, Comment, and Share models."""

import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Like(Base):
    __tablename__ = "likes"
    __table_args__ = (
        UniqueConstraint("user_id", "dicho_id", name="uq_user_dicho_like"),
    )

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), index=True
    )
    dicho_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("dichos.id", ondelete="CASCADE"), index=True
    )

    user: Mapped["User"] = relationship(back_populates="likes")  # noqa: F821
    dicho: Mapped["Dicho"] = relationship(back_populates="likes")  # noqa: F821


class Comment(Base):
    __tablename__ = "comments"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    text: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        index=True,
    )

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), index=True
    )
    dicho_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("dichos.id", ondelete="CASCADE"), index=True
    )

    user: Mapped["User"] = relationship(back_populates="comments")  # noqa: F821
    dicho: Mapped["Dicho"] = relationship(back_populates="comments")  # noqa: F821


class Share(Base):
    __tablename__ = "shares"
    __table_args__ = (
        UniqueConstraint("user_id", "dicho_id", name="uq_user_dicho_share"),
    )

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id"), index=True
    )
    dicho_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("dichos.id", ondelete="CASCADE"), index=True
    )

    user: Mapped["User"] = relationship(back_populates="shares")  # noqa: F821
    dicho: Mapped["Dicho"] = relationship(back_populates="shares")  # noqa: F821
