from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates


views_router = APIRouter()

templates = Jinja2Templates(directory='src/static/views')


@views_router.get("/users")
def view_users(request: Request):
    return templates.TemplateResponse(
        "/pages/users.html", 
        {
            "request": request
        }
    )