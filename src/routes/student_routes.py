from fastapi import (
    FastAPI,
    APIRouter,
    Depends,
    HTTPException,
    Response,
    status,
)
from sqlalchemy.orm import Session
from typing import Generator


from ..crud import (
    create_student,
    remove_student,
    retrieve_all_students,
    retrieve_student,
    update_student,
)
from ..database.database import Base, SessionLocal, engine
from ..datatypes import StudentType
from ..schemas import (
    CreateStudentSchema,
    UpdateStudentSchema
)


Base.metadata.create_all(bind=engine)

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


student_router = APIRouter()


@student_router.get(
    "/",
    status_code=status.HTTP_200_OK,
)
def get_all_students(
    db: Session = Depends(get_db)
) -> Generator:
    if result := retrieve_all_students(db):
        return result

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Não existem estudantes cadastrados.",
    )
    

@student_router.get(
    "/{student_id}/",
    status_code=status.HTTP_200_OK,
)
def get_student(
    student_id: int,
    db: Session = Depends(get_db)
) -> StudentType:
    if result := retrieve_student(db, student_id):
        return result

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Estudante de 'id={student_id}' não encontrado.",
    )


@student_router.delete(
    "/{student_id}/",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
) -> None:
    if not remove_student(db, student_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Estudante de 'id={student_id}' não encontrado.",
        )
        

@student_router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
)
def post_student(
    student: CreateStudentSchema,
    db: Session = Depends(get_db),
) -> StudentType:
    if result := create_student(db, student):
        return result

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST
    )


@student_router.put(
    "/{student_id}",
    status_code=status.HTTP_201_CREATED,
)
def put_student(
    student_id: int, 
    student: UpdateStudentSchema,
    db: Session = Depends(get_db),
) -> StudentType:
    if result := update_student(
        db, student_id, {
            key: value for key, value in student if value
        }
    ):
        return result

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Estudante de 'id={student_id}' não encontrado.",
    )