let systemURL = "http://127.0.0.1:8000/";

let value = JSON.parse(localStorage.getItem("book_system"));
if (value != null) {
    if (value.expireTime >= Date.now()) {
        window.location.href = "../html/book.html";
    }
    else {
        localStorage.removeItem("book_system");
    }
}

//验证表单是否为空，若为空则将焦点聚焦在input表单上，否则表单通过，登录成功
function Login() {
    ShowMsg("");
    var $account = $("#account"), $password = $("#password");
    var account = $account.val(), password = $password.val();
    if(!account || account == ""){
        ShowMsg("请输入账号");
        $account.focus();
        return false;
    }
    if(!password || password == ""){
        ShowMsg("请输入密码");
        $password.focus();
        return false;
    }
    console.log(account, password);
    $.ajax({
        url: systemURL + "user/login",// 获取自己系统后台用户信息接口
        data: JSON.stringify({"Account": account, "Password": password}),
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            if (data.Result == true){
                setTimeout(function () {//做延时以便显示登录状态值
                    ShowMsg("正在登录中...");
                    console.log(data);
                    SolveLocalStorage(account);
                    window.location.href = "../html/book.html";//指向登录的页面地址
                }, 100)
            } else {
                ShowMsg(data.Message); //显示登录失败的原因
                return false;
            }
        },
        error: function(data){
            ShowMsg(data.Message);
        }
    });
}

function Register() {
    console.log("register");
}
//错误信息提醒
function ShowMsg(msg) {
    $("#errormsg").text(msg);
}

function SolveLocalStorage(account) {
    console.log("localstorage", account);
    let valuetemp = localStorage.getItem("book_system");
    if (valuetemp != null) {
        localStorage.removeItem("book_system");
    }
    let nowDate = new Date()
    let nowTime = nowDate.getTime()  //当前时间戳
    let futureTime = Math.abs(nowTime) + (5 * 60 * 1000) //5分钟后的时间戳
    let expireTime = new Date(futureTime);
    localStorage.setItem("book_system", JSON.stringify({"account": account, "expireTime": expireTime.getTime()}));
}

$(function(){
    //监听回车键提交
    document.onkeydown=keyDownSearch;
    function keyDownSearch(e) {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            Login();
            return false;
        }
        return true;
    }
});