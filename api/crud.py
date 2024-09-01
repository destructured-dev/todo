from sqlalchemy.orm import Session
from uuid import uuid4
from datetime import datetime

from . import models, schemas

def add_todo(db: Session, todo: schemas.ToDoCreate):
    db_todo = models.ToDo(id=uuid4().hex, dateCreated=datetime.now(), text=todo.text, isComplete=False)    
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def toggle_complete(db: Session, todo_id: str):
    db_todo = db.query(models.ToDo).filter(models.ToDo.id == todo_id).first()
    if db_todo:
        if (db_todo.isComplete == True):
            db_todo.isComplete = False
        else:
            db_todo.isComplete = True
        db.commit()
        db.refresh(db_todo)
    return db_todo

def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.ToDo).offset(skip).limit(limit).all()

def delete_todo(db: Session, todo_id: str):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return {"message": "Todo was deleted."}


