from datetime import datetime
from pydantic import BaseModel, validator


class ValidatedOrder(BaseModel):
    value: float
    order_date: datetime

    @validator("order_date")
    def validate_order(cls, v: datetime, **kwargs) -> datetime:
        if v > datetime.now():
            raise ValueError(
                "A data do pedido não pode estar no futuro!"
            )
        return v

    @validator("value")
    def validate_value(cls, v: float, **kwargs) -> float:
        if v <= 0.0:
            raise ValueError(
                "Valor do pedido não pode ser menor ou igual a zero!"
            )
        return v