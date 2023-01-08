from sqlalchemy import Boolean, Column, Integer, String,DateTime
from sqlalchemy.ext.declarative import declarative_base

class User(declarative_base()):
    __tablename__ = "user"
    Id = Column(Integer, primary_key=True, index=True)
    Account = Column(String(20))
    Password = Column(String(20))
    CreateTime = Column(DateTime)
    IsDeleted = Column(Boolean)
