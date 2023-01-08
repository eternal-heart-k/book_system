let systemURL = "http://127.0.0.1:8000/";

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
function ShowMsg(msg){
    $("#errormsg").text(msg);
}

//监听回车键提交
$(function(){
    document.onkeydown=keyDownSearch;
    function keyDownSearch(e) {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {
            $('#login').click();
            return false;
        }
        return true;
    }
});