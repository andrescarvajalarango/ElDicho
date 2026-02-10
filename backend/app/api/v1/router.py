"""V1 API Router - aggregates all endpoint routers."""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, departamentos, dichos, users

router = APIRouter()
router.include_router(auth.router)
router.include_router(users.router)
router.include_router(departamentos.router)
router.include_router(dichos.router)
