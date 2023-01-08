### 安装环境
```
pip install fastapi
pip install uvicorn
pip install mysql
pip install pymysql
pip install sqlalchemy
```
<br>

### 运行
#### 在对应文件夹下：python .\main.py 运行后端main.py
#### 打开http://127.0.0.1:8000/docs 能看到后端api的swagger
#### 运行完后端后打开在前端static/html路径下的index.html
<br>

### 数据库
- 图书表
```
CREATE TABLE `book` (
  `Id` int NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `BookName` varchar(20) NOT NULL COMMENT '书名商品Id',
  `Author` varchar(10) NOT NULL COMMENT '作者',
  `Type` int NOT NULL COMMENT '书籍类型',
  `Description` varchar(50) NOT NULL COMMENT '概述',
  `CreateTime` datetime NOT NULL COMMENT '创建时间',
  `IsDeleted` bool NOT NULL COMMENT '是否删除',
  PRIMARY KEY (`Id`)
)
```
- 用户表
```
CREATE TABLE `user` (
  `Id` int NOT NULL AUTO_INCREMENT COMMENT '主键Id',
  `Account` varchar(20) NOT NULL COMMENT '账号',
  `Password` varchar(20) NOT NULL COMMENT '密码',
  `CreateTime` datetime NOT NULL COMMENT '创建时间',
  `IsDeleted` bool NOT NULL COMMENT '是否删除',
  PRIMARY KEY (`Id`)
)
```

