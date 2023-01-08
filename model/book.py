from sqlalchemy import Boolean, Column, Integer, String,DateTime
from sqlalchemy.ext.declarative import declarative_base

class Book(declarative_base()):
    __tablename__ = "book"
    Id = Column(Integer, primary_key=True, index=True)
    BookName = Column(String(20))
    Author = Column(String(10))
    Type = Column(Integer)
    Description = Column(String(50))
    CreateTime = Column(DateTime)
    IsDeleted = Column(Boolean)
