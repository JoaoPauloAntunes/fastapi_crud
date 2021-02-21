from fastapi import FastAPI, HTTPException, status, APIRouter
from typing import Dict, List, Optional, Union
import json


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