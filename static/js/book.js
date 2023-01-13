let systemURL = "http://127.0.0.1:8000/";
let value = JSON.parse(localStorage.getItem("book_system"));
if (value == null) {
  alert("获取账号信息失败,请先登录");
  window.location.href = "../html/index.html";
} else {
  if (value.expireTime <= Date.now()) {
    localStorage.removeItem("book_system");
    alert("账号信息已失效,请重新登录");
    window.location.href = "../html/index.html";
  }
}

let pageIndex = 1;
let pageSize = 10;
let totalCount = 0;
let nowCount = 0;
let pageInfo;




function getlist() {
  let bookName = $("#book-name").val();
  let author = $("#author").val();
  let $options = $("#book-type option:selected"); //获取选中的项
  let type = parseInt($options.val());

  $.ajax({
    url: systemURL + "book/list",// 获取自己系统后台用户信息接口
    data: JSON.stringify({
      "BookName": bookName, 
      "Author": author,
      "Type": type,
      "PageIndex": pageIndex,
      "PageSize": pageSize
    }),
    type: "POST",
    dataType: "json",
    contentType: 'application/json',
    success: function(data) {
        if (data.Result != null){
            pageInfo = data.Result.Items;
            totalCount = data.Result.Count;
            nowCount = data.Result.Items.length; 
            let $page_info = $("#page-info");
            $page_info.html("");
            for (let i = 0; i < nowCount; i ++ ) {
              let id = pageInfo[i].Id;
              let op_info = '<td id="updateordelete-btn"><button type="button" class="btn btn-primary modify-btn" onclick="UpdateBook(' + id + ')">修改</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger" onclick="DeleteBook(' + id + ')">删除</button></td>';
              let tr_info = "<tr><td>" + pageInfo[i].BookName + 
              "</td><td>" + pageInfo[i].Author + 
              "</td><td>" + ConvertType(pageInfo[i].Type) + 
              "</td><td>" + pageInfo[i].Description + "</td>" + op_info + "</tr>";
              $page_info.append(tr_info)
            }
            page_ctrl({
              obj_box:'.page-break',//翻页容器
              total_item: totalCount,//条目总数
              current_page: pageIndex
            });
        } else {
            alert("500，服务器异常");
        }
    },
    error: function(data){
      alert("500，服务器异常");
    }
  });
}
function ConvertType(type) {
  if (type == 1) return "青春";
  else if (type == 2) return "小说";
  else if (type == 3) return "文学";
  else if (type == 4) return "艺术";
  return "娱乐时尚";
}

function QueryPageInfo() {
  pageIndex = 1;
  getlist();
}

function SetText(text, id) {
  let $obj = $("#btn-addorupdate");
  $obj.text(text);
  if (text == "确认添加") $("#btn-cancel").text("取消添加");
  else $("#btn-cancel").text("取消修改");
  if (id != undefined && id != null) {
    $("#hideid").val(id);
    //根据id获取信息，赋值给input框对应位置
    $.ajax({
      url: systemURL + "book?id=" + id,// 获取自己系统后台用户信息接口
      type: "GET",
      dataType: "json",
      contentType: 'application/json',
      success: function(data) {
          if (data.Result != null){
              if (data.Result == false) {
                alert(data.Message);
              } else {
                $("#addorupdate-bookname").val(data.Result.BookName);
                $("#addorupdate-author").val(data.Result.Author);
                $("#book-type-add").val(data.Result.Type); //获取选中的项
                $("#addorupdate-description").val(data.Result.Description);
              }
          } else {
              alert("500，服务器异常");
          }
      },
      error: function(data){
        alert("500，服务器异常");
      }
    });
  }
}

function AddOrUpdate() {
  let text = $("#btn-addorupdate").text();
  let $bookname = $("#addorupdate-bookname");
  let $author = $("#addorupdate-author");
  let $options = $("#book-type-add option:selected"); //获取选中的项
  let $description = $("#addorupdate-description");
  let bookname = $bookname.val();
  let author = $author.val();
  let type = parseInt($options.val());
  let description = $description.val();
  if (bookname == null || bookname == "") {
    alert("请输入书名");
    return;
  }
  if (author == null || author == "") {
    alert("请输入作者");
    return;
  }
  if (bookname.length >= 20 || author.length >= 20) {
    alert("字数过多");
    return;
  }
  if (description == null || description == "") {
    alert("请输入书籍简介");
    return;
  } 
  if (description.length >= 200) {
    alert("书籍简介字数过多");
    return;
  }
  if (type == 0) {
    alert("请选择书籍类型");
    return;
  }
  if (text == "确认添加") {
    $.ajax({
      url: systemURL + "book",// 获取自己系统后台用户信息接口
      type: "POST",
      data: JSON.stringify({
        "BookName": bookname, 
        "Author": author,
        "Type": type,
        "Description": description
      }),
      dataType: "json",
      contentType: 'application/json',
      success: function(data) {
          if (data.Result == true){
              swal("添加成功", "", "success");
              $("#addorupdate-bookname").val('');
              $("#addorupdate-author").val('');
              $("#book-type-add").val(0);
              $("#addorupdate-description").val('');
              getlist();
          } else {
              alert(data.Message);
          }
      },
      error: function(data){
        alert("500，服务器异常");
      }
    });
  } else if (text == "确认修改") {
    let id = $("#hideid").val();
    $.ajax({
      url: systemURL + "book",// 获取自己系统后台用户信息接口
      type: "PUT",
      data: JSON.stringify({
        "Id": id,
        "BookName": bookname, 
        "Author": author,
        "Type": type,
        "Description": description
      }),
      dataType: "json",
      contentType: 'application/json',
      success: function(data) {
          if (data.IsSuccess == true){
              swal("修改成功", "", "success");
              $("#addorupdate-bookname").val('');
              $("#addorupdate-author").val('');
              $("#book-type-add").val(0);
              $("#addorupdate-description").val('');
              getlist();
          } else {
              alert(data.Message);
          }
      },
      error: function(data){
        alert("500，服务器异常");
      }
    });
  }
  HideTheBox();
}

function AddBook() {
  SetText("确认添加");
  ShowTheBox();
}

function UpdateBook(id) {
  SetText("确认修改", id);
  ShowTheBox();
}

function HideTheBox() {
  $(".addorupdate").hide();
  $(".hidebg").hide();
}

function ShowTheBox() {
  $(".hidebg").show();
  $(".addorupdate").show();
}

function DeleteBook(id) {
  swal({ 
    title: "确定删除吗？", 
    type: "warning",
    showCancelButton: true, 
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "确定删除", 
    cancelButtonText: "取消删除",
    closeOnConfirm: false, 
    closeOnCancel: true        
    },
    function() {
        $.ajax({
          url: systemURL + "book?id=" + id,// 获取自己系统后台用户信息接口
          type: "DELETE",
          dataType: "json",
          contentType: 'application/json',
          success: function(data) {
              if (data.Result == true){
                  swal("删除成功", "", "success");
                  getlist();
              } else {
                  alert(data.Message);
              }
          },
          error: function(data){
            alert("500，服务器异常");
          }
        });
    } 
);
}

$(function() {
  HideTheBox();
  $("#hideid").hide();
  getlist();
});

