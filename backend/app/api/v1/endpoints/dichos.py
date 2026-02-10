"""Dicho endpoints - the core of the application."""

import math

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.config import get_settings
from app.core.database import get_db
from app.core.security import get_current_user, get_optional_user
from app.models.departamento import Departamento
from app.models.dicho import Dicho
from app.models.interactions import Comment, Like, Share
from app.models.user import User
from app.schemas.dicho import (
    CommentCreate,
    CommentResponse,
    DepartamentoBrief,
    DichoCreate,
    DichoEngagement,
    DichoListResponse,
    DichoPagination,
    DichoResponse,
    LikeResponse,
    ShareResponse,
)
from app.schemas.user import UserBrief

settings = get_settings()
router = APIRouter(prefix="/dichos", tags=["Dichos"])


def _build_dicho_response(
    dicho: Dicho,
    likes_count: int,
    comments_count: int,
    shares_count: int,
    user_liked: bool = False,
    user_shared: bool = False,
) -> DichoResponse:
    """Build a standardized dicho response."""
    return DichoResponse(
        id=dicho.id,
        text=dicho.text,
        meaning=dicho.meaning,
        author=dicho.author,
        is_anonymous=dicho.is_anonymous,
        created_at=dicho.created_at,
        user=UserBrief.model_validate(dicho.user),
        departamento=DepartamentoBrief.model_validate(dicho.departamento),
        engagement=DichoEngagement(
            likes=likes_count,
            comments=comments_count,
            shares=shares_count,
        ),
        comments=[
            CommentResponse(
                id=c.id,
                text=c.text,
                created_at=c.created_at,
                user=UserBrief.model_validate(c.user),
            )
            for c in dicho.comments
        ],
        user_liked=user_liked,
        user_shared=user_shared,
    )


@router.get(
    "",
    response_model=DichoListResponse,
    summary="Listar dichos con paginación y filtros",
)
async def list_dichos(
    departamento_id: str | None = Query(default=None, alias="departamentoId"),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    current_user: User | None = Depends(get_optional_user),
    db: AsyncSession = Depends(get_db),
):
    # Base query
    base_filter = []
    if departamento_id:
        base_filter.append(Dicho.departamento_id == departamento_id)

    # Count total
    count_query = select(func.count(Dicho.id))
    if base_filter:
        count_query = count_query.where(*base_filter)
    total = (await db.execute(count_query)).scalar() or 0

    # Fetch dichos with relations
    query = (
        select(Dicho)
        .options(
            selectinload(Dicho.user),
            selectinload(Dicho.departamento),
            selectinload(Dicho.comments).selectinload(Comment.user),
            selectinload(Dicho.likes),
            selectinload(Dicho.shares),
        )
        .order_by(Dicho.created_at.desc())
        .offset((page - 1) * limit)
        .limit(limit)
    )
    if base_filter:
        query = query.where(*base_filter)

    result = await db.execute(query)
    dichos = result.scalars().all()

    # Check which dichos the current user has liked/shared
    user_liked_ids: set[str] = set()
    user_shared_ids: set[str] = set()
    if current_user:
        dicho_ids = [d.id for d in dichos]
        if dicho_ids:
            liked_result = await db.execute(
                select(Like.dicho_id).where(
                    Like.user_id == current_user.id,
                    Like.dicho_id.in_(dicho_ids),
                )
            )
            user_liked_ids = {row[0] for row in liked_result.all()}

            shared_result = await db.execute(
                select(Share.dicho_id).where(
                    Share.user_id == current_user.id,
                    Share.dicho_id.in_(dicho_ids),
                )
            )
            user_shared_ids = {row[0] for row in shared_result.all()}

    dicho_responses = [
        _build_dicho_response(
            dicho=d,
            likes_count=len(d.likes),
            comments_count=len(d.comments),
            shares_count=len(d.shares),
            user_liked=d.id in user_liked_ids,
            user_shared=d.id in user_shared_ids,
        )
        for d in dichos
    ]

    return DichoListResponse(
        dichos=dicho_responses,
        pagination=DichoPagination(
            page=page,
            limit=limit,
            total=total,
            total_pages=math.ceil(total / limit) if total > 0 else 0,
        ),
    )


@router.post(
    "",
    response_model=DichoResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Crear un nuevo dicho",
)
async def create_dicho(
    body: DichoCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Validate departamento exists
    dept_result = await db.execute(
        select(Departamento).where(Departamento.id == body.departamento_id)
    )
    if not dept_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Departamento no encontrado",
        )

    dicho = Dicho(
        text=body.text,
        meaning=body.meaning,
        author=body.author,
        is_anonymous=body.is_anonymous,
        user_id=current_user.id,
        departamento_id=body.departamento_id,
    )
    db.add(dicho)
    await db.flush()

    # Reload with relations
    result = await db.execute(
        select(Dicho)
        .options(
            selectinload(Dicho.user),
            selectinload(Dicho.departamento),
            selectinload(Dicho.comments),
            selectinload(Dicho.likes),
            selectinload(Dicho.shares),
        )
        .where(Dicho.id == dicho.id)
    )
    dicho = result.scalar_one()

    return _build_dicho_response(dicho, 0, 0, 0)


@router.get(
    "/{dicho_id}",
    response_model=DichoResponse,
    summary="Obtener un dicho por ID",
)
async def get_dicho(dicho_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Dicho)
        .options(
            selectinload(Dicho.user),
            selectinload(Dicho.departamento),
            selectinload(Dicho.comments).selectinload(Comment.user),
            selectinload(Dicho.likes),
            selectinload(Dicho.shares),
        )
        .where(Dicho.id == dicho_id)
    )
    dicho = result.scalar_one_or_none()

    if not dicho:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dicho no encontrado",
        )

    return _build_dicho_response(
        dicho, len(dicho.likes), len(dicho.comments), len(dicho.shares)
    )


@router.delete(
    "/{dicho_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Eliminar un dicho (solo el autor)",
)
async def delete_dicho(
    dicho_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Dicho).where(Dicho.id == dicho_id))
    dicho = result.scalar_one_or_none()

    if not dicho:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dicho no encontrado",
        )

    if dicho.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permiso para eliminar este dicho",
        )

    await db.delete(dicho)


@router.post(
    "/{dicho_id}/like",
    response_model=LikeResponse,
    summary="Dar/quitar like a un dicho",
)
async def toggle_like(
    dicho_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Verify dicho exists
    dicho_result = await db.execute(select(Dicho.id).where(Dicho.id == dicho_id))
    if not dicho_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dicho no encontrado",
        )

    # Check existing like
    existing = await db.execute(
        select(Like).where(
            Like.user_id == current_user.id, Like.dicho_id == dicho_id
        )
    )
    like = existing.scalar_one_or_none()

    if like:
        await db.execute(delete(Like).where(Like.id == like.id))
        return LikeResponse(liked=False)

    new_like = Like(user_id=current_user.id, dicho_id=dicho_id)
    db.add(new_like)
    return LikeResponse(liked=True)


@router.post(
    "/{dicho_id}/comment",
    response_model=CommentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Comentar un dicho",
)
async def add_comment(
    dicho_id: str,
    body: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Verify dicho exists
    dicho_result = await db.execute(select(Dicho.id).where(Dicho.id == dicho_id))
    if not dicho_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dicho no encontrado",
        )

    comment = Comment(
        text=body.text,
        user_id=current_user.id,
        dicho_id=dicho_id,
    )
    db.add(comment)
    await db.flush()
    await db.refresh(comment)

    return CommentResponse(
        id=comment.id,
        text=comment.text,
        created_at=comment.created_at,
        user=UserBrief.model_validate(current_user),
    )


@router.post(
    "/{dicho_id}/share",
    response_model=ShareResponse,
    summary="Compartir un dicho",
)
async def share_dicho(
    dicho_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    # Verify dicho exists
    dicho_result = await db.execute(select(Dicho.id).where(Dicho.id == dicho_id))
    if not dicho_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dicho no encontrado",
        )

    # Check if already shared
    existing = await db.execute(
        select(Share).where(
            Share.user_id == current_user.id, Share.dicho_id == dicho_id
        )
    )
    if existing.scalar_one_or_none():
        return ShareResponse(shared=True, already_shared=True)

    share = Share(user_id=current_user.id, dicho_id=dicho_id)
    db.add(share)
    return ShareResponse(shared=True, already_shared=False)
