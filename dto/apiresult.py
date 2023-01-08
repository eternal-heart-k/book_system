class ApiResult:
    def __init__(self, Result, IsSuccess = True, Message = ""):
        self.Result = Result
        self.IsSuccess = IsSuccess
        self.Message = Message