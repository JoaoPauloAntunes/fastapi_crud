from fastapi import FastAPI, HTTPException, status, APIRouter
from typing import Dict, List, Optional, Union
import json

from ..schemas import (
    CreateStudentSchema,
    UpdateStudentSchema
)
from ..datatypes import StudentType


students = json.load(open("src/data/students.json", "r"))
student_router = APIRouter()


@student_router.get("/")
def get_all_students() -> List[Dict[str, Union[float, int, str]]]:
    if response := students:
        return response

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Não existem estudantes cadastrados.",
    )
    

@student_router.get("/{student_id}/")
def get_student(
    student_id: int
) -> Dict[str, Union[float, int, str]]:
    if response := list(
        filter(lambda i: i.get("id") == student_id, students)
    ):
        return response[0]
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Estudante de 'id={student_id}' não encontrado.",
    )


@student_router.delete("/{student_id}/")
def delete_student(
    student_id: int
) -> Dict[str, bool]:
    if response := list(
        filter(lambda i: i.get("id") == student_id, students)
    ):
        del students[students.index(response[0])]
        return {"success": True}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Estudante de 'id={student_id}' não encontrado.",
    )


def get_max() -> int:
    max_student = max(students, key=lambda i: i.get("id", 0))
    return max_student.get("id", 0)

@student_router.post("/")
def post_student(student: CreateStudentSchema) -> StudentType:
    students.append(
        new_student := {**{"id": get_max() + 1}, **student.dict()}
    )
    return new_student


@student_router.put("/{student_id}")
def put_student(student_id: int, student: UpdateStudentSchema) -> StudentType:
    if old_student := retrieve_student(student_id):
        updated_student = {
            **old_student,
            **{key: value for key, value in student if value},
        }
    students[students.index(old_student)] = updated_student
    return updated_student