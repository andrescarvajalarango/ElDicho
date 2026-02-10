"""User schemas."""

from datetime import datetime

from pydantic import BaseModel, Field


class UserPublic(BaseModel):
    id: str
    username: str
    name: str
    avatar: str | None
    bio: str | None
    region: str | None
    created_at: datetime

    model_config = {"from_attributes": True}


class UserBrief(BaseModel):
    id: str
    username: str
    name: str
    avatar: str | None

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=1, max_length=100)
    bio: str | None = Field(default=None, max_length=500)
    avatar: str | None = Field(default=None, max_length=500)
    region: str | None = Field(default=None, max_length=50)
