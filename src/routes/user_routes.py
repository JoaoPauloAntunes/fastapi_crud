from fastapi import APIRouter
from fastapi.templating import Jinja2Templates

from ..database import schemas


user_router = APIRouter()


fake_users_db = [
    {
        "id": 1,
        "name": "João Paulo",
        "email": "joao@gmail.com",
        "is_active": True,
        "items": []
    },
    {
        "id": 2,
        "name": "Débora",
        "email": "debora@gmail.com",
        "is_active": True,
        "items": []
    },
    {
        "id": 3,
        "name": "Laise",
        "email": "laise@gmail.com",
        "is_active": False,
        "items": []
    }
]

@user_router.get("/")                               # route; path params
def read_users(skip: int = 0, limit: int = 100):    # query params
    print(">> read_users")
    print(skip)
    print(limit)
    return {
        "status": True,
        "data": fake_users_db[skip : skip + limit]
    }


@user_router.get("/{email}")
def read_user(email: str):
    print(">> read_user")

    target_user = {}
    status = False
    for user in fake_users_db:
        if email == user["email"]:
            target_user = user
            status = True
            break

    return {
        "status": status,
        "data": target_user
    }


# The data is received in String JSON format, then it is converted to an object of the "UserCreate" class
@user_router.post("/")
def create_user(user: schemas.UserCreate):
    print(">> create_user")
    return user


""" @user_router.put("/")
def update_user(user: schemas.UserCreate):
    print(">> update_user")
    return {
        "status": True,
        "data": {
            "user": {
                "id": 1,
                "email": "joao@gmail.com",
                "is_active": True,
                "items": []
            }
        }
    } """

""" @user_router.delete("/")
def delete_user(email: str):
    print(">> delete_user")
    return {
        "status": True,
        "data": {}
    } """