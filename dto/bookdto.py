from pydantic import BaseModel

class BookDto(BaseModel):
    Id: int = 0
    BookName: str
    Author: str
    Type: int
    Description: str