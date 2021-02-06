from fastapi import APIRouter, Form
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

test_router = APIRouter()


class Pet(BaseModel):
    name: str
    age: int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "name": "Fred",
                "age": 2
            }
        }

# work!
""" @test_router.post("/pets/")
def test_post(name: str = Form(...), age: int = Form(...)):
    print(">> test_post")
    return {
        "name": name,
        "age": age
    } """

@test_router.post("/pets/")
def test_post(pet: Pet):
    print(">> test_post")
    return pet