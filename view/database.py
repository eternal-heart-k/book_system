from sqlalchemy import create_engine
from settings import SQLALCHEMY_DATABASE_URI
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

def get_db():
    # 生成一个SQLAlchemy引擎
    engine = create_engine(SQLALCHEMY_DATABASE_URI,pool_pre_ping=True)
    # 生成sessionlocal类，这个类的每一个实例都是一个数据库的会话
    # 注意命名为SessionLocal，与sqlalchemy的session分隔开
    SessionLocal = sessionmaker(autocommit=False,autoflush=False,bind=engine)
    db = SessionLocal()
    Base = declarative_base()
    Base.metadata.create_all(bind=engine)
    try:
        yield db
    finally:
        db.close()