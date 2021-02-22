from sqlalchemy import Column, Integer, String
from .database.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    address = Column(String)
    neighbour = Column(String)
    city = Column(String)
    state = Column(String)
    postal_code = Column(String)