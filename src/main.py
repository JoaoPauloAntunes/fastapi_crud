from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .routes.user_routes import user_router
from .routes.views_routes import views_router


app = FastAPI()

app.mount("/static", StaticFiles(directory='src/static'), name="static")

@app.get("/")
def root():
    return {"message": "The API is working..."}

app.include_router(views_router, prefix="/views", tags=["views"])
app.include_router(user_router, prefix="/users", tags=["users"])