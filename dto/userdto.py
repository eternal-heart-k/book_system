from pydantic import BaseModel

class UserDto(BaseModel):
    Account: str
    Password: str