from datetime import datetime
from fastapi import Depends, APIRouter
from dto.userdto import UserDto
from view.database import get_db
from dto.apiresult import ApiResult
# from model.user import User

router = APIRouter(prefix="/user", tags=["user"])

# @router.get("")
# async def GetAUser(account: str, db = Depends(get_db)):
#     user = db.query(User).filter(User.Account==account, User.IsDeleted==False).first()
#     if user is None:
#         return ApiResult(False, True, "账号不存在")
#     return ApiResult(user)

@router.post("/login")
async def Login(userdto: UserDto, db = Depends(get_db)):
    if userdto.Account == "" or userdto.Account is None or userdto.Password == "" or userdto.Password is None:
        return ApiResult(False, True, "账号或密码不能为空")
    # user = db.query(User).filter(User.Account==userdto.Account, User.Password==userdto.Password, User.IsDeleted==False).first()
    # if user is None:
    if userdto.Account != "admin" or userdto.Password != "123456":
        return ApiResult(False, True, "账号或密码错误")
    return ApiResult(True)

# @router.post("/register")
# async def Register(userdto: UserDto, db = Depends(get_db)):
#     try:
#         if userdto.Account == "" or userdto.Account is None or userdto.Password == "" or userdto.Password is None:
#             return ApiResult(False, True, "账号或密码不能为空")
#         if len(userdto.Password) < 6:
#             return ApiResult(False, True, "密码长度不能少于六位")
#         user = db.query(User).filter(User.Account==userdto.Account, User.IsDeleted==False).first()
#         if user:
#             return ApiResult(False, True, "账号已存在")
#         newuser = User(Account=userdto.Account, Password=userdto.Password, NickName=userdto.NickName, CreateTime=datetime.now(), IsDeleted=False)
#         db.add(newuser)
#         db.commit()
#         db.refresh(newuser)
#     except ArithmeticError:
#         return ApiResult(False, False, "数据库异常")
#     return ApiResult(True, True, "添加成功")

# @router.put("/password")
# async def UpdatePassword(userdto: UserDto, db = Depends(get_db)):
#     try:
#         if userdto.Password == "" or userdto.Password is None:
#             return ApiResult(False, True, "密码不能为空")
#         if len(userdto.Password) < 6:
#             return ApiResult(False, True, "密码长度不能少于六位")
#         user = db.query(User).filter(User.Account==userdto.Account, User.IsDeleted==False).first()
#         if user is None:
#             return ApiResult(False, True, "账号不存在")
#         user.Password = userdto.Password
#         db.commit()
#         db.refresh(user)
#     except ArithmeticError:
#         return ApiResult(False, False, "数据库异常")
#     return ApiResult(True, True, "修改成功")