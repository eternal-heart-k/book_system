from datetime import datetime
from fastapi import Depends, APIRouter
from dto.bookquerydto import BookQueryDto
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

@router.post("/list")
async def GetBookList(dto: BookQueryDto, db = Depends(get_db)):
    books = db.query(Book).filter(Book.IsDeleted==False).all()
    if dto.BookName is not None and dto.BookName != "":
        books = list(filter(lambda x: x.BookName.find(dto.BookName) >= 0, books))
    if dto.Author is not None and dto.Author != "":
        books = list(filter(lambda x: x.Author.find(dto.Author) >= 0, books))
    if dto.Type != 0:
        books = list(filter(lambda x: x.Type == dto.Type, books))

    books.sort(key=lambda x: -x.Id)
    start = (dto.PageIndex - 1) * dto.PageSize
    totalcount = len(books)
    return ApiResult({"Count": totalcount, "Items": books[start : start + dto.PageSize]})

@router.post("")
async def AddABook(bookdto: BookDto, db = Depends(get_db)):
    try:
        book = db.query(Book).filter(Book.BookName==bookdto.BookName, Book.Author==bookdto.Author, Book.IsDeleted==False).first()
        if book:
            return ApiResult(False, False, "添加失败，已存在此作者这本书籍")
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