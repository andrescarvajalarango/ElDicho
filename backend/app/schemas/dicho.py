"""Dicho schemas."""

from datetime import datetime

from pydantic import BaseModel, Field

from app.schemas.user import UserBrief


class DichoCreate(BaseModel):
    text: str = Field(min_length=1, max_length=500)
    meaning: str | None = Field(default=None, max_length=1000)
    author: str | None = Field(default=None, max_length=100)
    is_anonymous: bool = False
    departamento_id: str


class DepartamentoBrief(BaseModel):
    id: str
    name: str
    code: str
    region: str

    model_config = {"from_attributes": True}


class DichoEngagement(BaseModel):
    likes: int
    comments: int
    shares: int


class CommentResponse(BaseModel):
    id: str
    text: str
    created_at: datetime
    user: UserBrief

    model_config = {"from_attributes": True}


class DichoResponse(BaseModel):
    id: str
    text: str
    meaning: str | None
    author: str | None
    is_anonymous: bool
    created_at: datetime
    user: UserBrief
    departamento: DepartamentoBrief
    engagement: DichoEngagement
    comments: list[CommentResponse]
    user_liked: bool = False
    user_shared: bool = False

    model_config = {"from_attributes": True}


class DichoPagination(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int


class DichoListResponse(BaseModel):
    dichos: list[DichoResponse]
    pagination: DichoPagination


class CommentCreate(BaseModel):
    text: str = Field(min_length=1, max_length=500)


class LikeResponse(BaseModel):
    liked: bool


class ShareResponse(BaseModel):
    shared: bool
    already_shared: bool = False
