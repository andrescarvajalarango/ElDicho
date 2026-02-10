"""Departamento endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.departamento import Departamento
from app.models.dicho import Dicho
from app.schemas.departamento import DepartamentoResponse

router = APIRouter(prefix="/departamentos", tags=["Departamentos"])


@router.get(
    "",
    response_model=list[DepartamentoResponse],
    summary="Listar todos los departamentos con conteo de dichos",
)
async def list_departamentos(db: AsyncSession = Depends(get_db)):
    # Subquery for dicho count per departamento
    count_subq = (
        select(
            Dicho.departamento_id,
            func.count(Dicho.id).label("dicho_count"),
        )
        .group_by(Dicho.departamento_id)
        .subquery()
    )

    result = await db.execute(
        select(
            Departamento,
            func.coalesce(count_subq.c.dicho_count, 0).label("dicho_count"),
        )
        .outerjoin(count_subq, Departamento.id == count_subq.c.departamento_id)
        .order_by(Departamento.name)
    )

    departamentos = []
    for row in result.all():
        dept = row[0]
        departamentos.append(
            DepartamentoResponse(
                id=dept.id,
                name=dept.name,
                code=dept.code,
                region=dept.region,
                dicho_count=row[1],
            )
        )

    return departamentos
