"""Departamento schemas."""

from pydantic import BaseModel


class DepartamentoResponse(BaseModel):
    id: str
    name: str
    code: str
    region: str
    dicho_count: int = 0

    model_config = {"from_attributes": True}
