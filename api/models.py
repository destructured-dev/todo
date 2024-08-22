from sqlalchemy import Boolean, Column, String, DateTime

from .database import Base

class ToDo(Base):
    __tablename__= 'todos'

    id = Column(String, primary_key=True)
    dateCreated = Column(DateTime, index=True)
    text = Column(String, index=True)
    isComplete = Column(Boolean, default=False)

