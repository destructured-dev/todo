from pydantic import BaseModel, Field
from uuid import uuid4
from datetime import datetime

class ToDoBase(BaseModel):
    text: str

class ToDoCreate(ToDoBase):
    pass

class ToDo(ToDoBase):
    id: str
    dateCreated: datetime
    isComplete: bool 