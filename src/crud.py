from typing import Generator

from sqlalchemy.orm import Session

from .datatypes import UpdateStudentValuesType
from .models import Student
from .schemas import CreateStudentSchema, StudentSchema


students = Student


def create_student(
    db: Session, student: CreateStudentSchema
):
    new_student = Student(**student.dict())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student


def retrieve_all_students(db: Session) -> Generator:
    return db.query(students).all()


def retrieve_student(db: Session, student_id: int):
    return db.query(students).filter(
        students.id == student_id
    ).first()


def update_student(
    db: Session,
    student_id: int,
    values: UpdateStudentValuesType
):
    if student := retrieve_student(db, student_id):
        db.query(students).filter(
            students.id == student_id
        ).update(values)
        db.commit()
        db.refresh(student)

        return student


def remove_student(db: Session, student_id: int) -> bool:
    if student := retrieve_student(db, student_id):
        db.delete(student)
        db.commit()
        return True

    return False