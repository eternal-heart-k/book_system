from datetime import datetime
from fastapi import Depends, APIRouter
from view.database import get_db
from model.book import Book
from dto.apiresult import ApiResult
from dto.bookdto import BookDto

router = APIRouter(prefix="/book", tags=["book"])

@router.get("")
async def GetABook(id: int, db = Depends(get_db)):
    book = db.query(Book).filter(Book.Id==id, Book.IsDeleted==False).first()
    if book is None:
        return ApiResult(False, True, "id有误, 查询不到此书籍")
    return ApiResult(book)

@router.get("/list")
async def GetBookList(pageindex: int, pagesize: int, db = Depends(get_db)):
    books = db.query(Book).filter(Book.IsDeleted==False).all()
    start = (pageindex - 1) * pagesize
    return ApiResult({"items": books[start : start + pagesize], "count": len(books)})

@router.post("")
async def AddABook(bookdto: BookDto, db = Depends(get_db)):
    try:
        newbook = Book(BookName=bookdto.BookName, Author=bookdto.Author, Type=bookdto.Type, 
            Description=bookdto.Description, CreateTime=datetime.now(), IsDeleted=False)
        db.add(newbook)
        db.commit()
        db.refresh(newbook)
    except ArithmeticError:
        return ApiResult(False, False, "数据库异常")
    return ApiResult(True, True, "添加成功")

@router.put("")
async def UpdateABook(bookdto: BookDto, db = Depends(get_db)):
    try:
        book = db.query(Book).filter(Book.Id==bookdto.Id, Book.IsDeleted==False).first()
        if book is None:
            return ApiResult(True, False, "id有误, 查询不到此书籍")
        else:
            book.BookName = bookdto.BookName
            book.Author = bookdto.Author
            book.Type = bookdto.Type
            book.Description = bookdto.Description
            db.commit()
            db.refresh(book)
    except ArithmeticError:
        return ApiResult(False, False, "数据库异常")
    return ApiResult(True, True, "更新成功")

@router.delete("")
async def DeleteABook(id: int, db = Depends(get_db)):
    try:
        book = db.query(Book).filter(Book.Id==id, Book.IsDeleted==False).first()
        if book is None:
            return ApiResult(False, True, "id有误, 查询不到此书籍")
        else:
            book.IsDeleted = True
            db.commit()
            db.refresh(book)
    except ArithmeticError:
        return ApiResult(False, False, "数据库异常")
    return ApiResult(True, True, "删除成功")