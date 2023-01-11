from pydantic import BaseModel

class UserDto(BaseModel):
    Account: str
    Password: str
    NickName: str = "游客"