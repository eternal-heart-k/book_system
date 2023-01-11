let systemURL = "http://127.0.0.1:8000/";
let value = JSON.parse(localStorage.getItem("book_system"));
let account;
if (value != null) account = value.account;
let isAdmin = false;
if (account == "admin") {
    isAdmin = true;
}
console.log(isAdmin);

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
      console.log(data);
        if (data.Result != null){
            pageInfo = data.Result.Items;
            totalCount = data.Result.Count;
            nowCount = data.Result.Items.length; 
            let $page_info = $("#page-info");
            $page_info.html("");
            for (let i = 0; i < nowCount; i ++ ) {
              let id = pageInfo[i].Id;
              let op_info = '<td><button type="button" class="btn btn-primary" onclick="UpdateBook(' + id + ')">修改</button>&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger" onclick="DeleteBook(' + id + ')">删除</button></td>';
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

function AddBook() {
  console.log("add a book");
}

function UpdateBook(id) {
  console.log(id);
}

function DeleteBook(id) {
  console.log(id);
}

$(function() {
  getlist();
});

