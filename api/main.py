from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/todos/", response_model=list[schemas.ToDo])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip=skip, limit=limit)
    return todos

@app.post("/todos/", response_model=schemas.ToDo)
def add_todo(todo: schemas.ToDoCreate, db: Session = Depends(get_db)):    
    return crud.add_todo(db=db, todo=todo)

@app.patch("/todos/{todo_id}/", response_model=schemas.ToDo)
def toggle_complete(todo_id: str, db: Session = Depends(get_db)):
    return crud.mark_complete(db, todo_id=todo_id)

@app.delete("/todos/{todo_id}/")
def delete_todo(todo_id: str, db: Session = Depends(get_db)):
    return crud.delete_todo(db, todo_id=todo_id)
