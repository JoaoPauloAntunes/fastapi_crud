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
    },
    {
        "id": 4,
        "name": "Isabela",
        "email": "isabela@gmail.com",
        "is_active": True,
        "items": []
    }
]


# The data is received in String JSON format, then it is converted to an object of the "UserCreate" class
@user_router.post("/")
def create_user(user: schemas.UserCreate):
    print(">> create_user")
    return user



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



@user_router.put("/{email}")
def update_user(email: str, new_user: schemas.User):
    print(">> read_user")

    message = "user not found"
    status = False
    for index, user in enumerate(fake_users_db):
        if user["email"] == email:
            fake_users_db[index] = new_user.dict()
            message = "user changed"
            status = True
            break
        
    return {
        "status": status,
        "data": {
            "message": message,
            "users": fake_users_db
        }
    }


@user_router.delete("/{email}")
def remove_user(email: str):
    print(">> remove_user")

    message = "user not found"
    status = False
    for index, user in enumerate(fake_users_db):
        if user["email"] == email:
            fake_users_db.pop(index)
            message = "user removed"
            status = True
            break

    return {
        "status": status,
        "data": {
            "message": message,
            "users": fake_users_db
        }
    }