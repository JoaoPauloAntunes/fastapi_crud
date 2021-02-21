from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .routes.views_routes import views_router
from .routes.user_routes import user_router
from .routes.test_routes import test_router
from .routes.student_routes import student_router


app = FastAPI()

app.mount("/static", StaticFiles(directory='src/static'), name="static")
app.mount("/data", StaticFiles(directory="data"), name="data")

@app.get("/")
def root():
    return {"message": "The API is working..."}

app.include_router(views_router, prefix="/views", tags=["views"])
app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(test_router, prefix="/tests", tags=["tests"])
app.include_router(student_router, prefix="/students", tags=["students"])