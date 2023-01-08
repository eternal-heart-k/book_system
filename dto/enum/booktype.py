from enum import Enum

class BookType(Enum):
    #青春类型
    Youth = 1
    #小说类型
    Fiction = 2
    #文学类型
    Literature = 3
    #艺术类型
    Art = 4
    #娱乐时尚类型
    EntertainmentFashion = 5

BookType.Youth.label = "青春"
BookType.Fiction.label = "小说"
BookType.Literature.label = "文学"
BookType.Art.label = "艺术"
BookType.EntertainmentFashion.label = "娱乐时尚"