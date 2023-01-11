from pydantic import BaseModel

class BookQueryDto(BaseModel):
    BookName: str
    Author: str
    Type: int
    PageIndex: int = 1
    PageSize: int = 10