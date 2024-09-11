from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict
from datetime import datetime, date

class ToDoBase(BaseModel):
    text: str

class ToDoCreate(ToDoBase):
    pass

class ToDo(ToDoBase):
    id: str
    dateCreated: datetime
    isComplete: bool 

class GetUser(BaseModel):
    email: EmailStr
    username: Optional[str]
    role: int

    class Config:
        orm_mode = True
        use_enum_values = True

class PostUser(BaseModel):
    email: EmailStr
    username: Optional[str]
    password: str

    class Config:
        orm_mode = True
        user_enum_values = True

