from fastapi import APIRouter, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from shutil import copyfileobj
import os

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


@user_router.post('/profile_photo/')
def receive_profile_photo(profile_photo: UploadFile = File(...)):
    profile_photo_path = f"data/{profile_photo.filename}"

    try:
        with open(profile_photo_path, 'wb') as create_file:
            copyfileobj(profile_photo.file, create_file)
            is_created = True
    except:
        is_created = False
    finally:
        return {
            "status": is_created,
            "data": {
                "message": "profile photo uploaded" if is_created else "profile photo don't uploaded",
                "file_name": profile_photo.filename,
                "content_type": profile_photo.content_type,
                "file_path": profile_photo_path,
            }
        }
        

@user_router.get("/profile_photo/{profile_photo_name}", response_class=FileResponse)
def send_profile_photo(profile_photo_name: str):
    profile_photo_path = f"data/{profile_photo_name}"
    return FileResponse(path=profile_photo_path, media_type='application/octet-stream', filename=profile_photo_name)