let currentUser = JSON.parse(localStorage.getItem("currentUser"));
$(document).ready(function (){
    document.getElementById("infoMinistry").innerHTML = currentUser.name;
    document.getElementById("emailMinistry").innerHTML = currentUser.email;
    document.getElementById("phoneMinistry").innerHTML = currentUser.phone;
})
let pageUser = -1;
let pageGrade = -1;
function showListUser(a, b){
    let role;
    if (a!="ROLE_TEACHER" && a!="ROLE_STUDENT"){
        role = a.getAttribute("href");
    }
    else {
        role = a;
    }
    if (b){
        pageUser++;
    }
    else {
        pageUser--;
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: 'GET',
        url: `http://localhost:8081/user/page/`+role+`?page=`+pageUser,
        success : function (data){
            console.log("data= "+ data)
            let content = `<table class="table table-dark table-hover"><tr><th>Name</th><th>Code</th><th>Email</th><th>Phone</th><th>Image</th><th colspan="2">Action</th></tr>`;
            for (let i = 0; i < data.content.length; i++){
                content += getUser(data.content[i], role);
            }
            content += `</table>`
            if (pageUser > 0){
                content += `<button href="${role}" onclick="showListUser(this, false)">previous</button>`
            }
            if (data.content.length == 6){
                content+= `<button href="${role}" onclick="showListUser(this, true)">next</button>`;
            }
            document.getElementById("showListUser").innerHTML = content;
        }
    });
    event.preventDefault();
}
function getUser(user, role){
    return `<tr><td>${user.name}</td><td>${user.code}</td><td>${user.email}</td><td>${user.phone}</td><td><a href="http://localhost:8081/getimage/${user.image}"><img src="http://localhost:8081/getimage/${user.image}" alt="" width="50" height="50"></a></td><td><a href="http://localhost:8081/user/ministry/edit/${user.id}">Edit</a></td><td><a href="${user.id}" name="${role}" id="role" onclick="deleteUser(this)">Delete</a></td></tr>`;
}
function deleteUser(a){
    let id = a.getAttribute("href");
    let role = document.getElementById("role").name;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "DELETE",
        url: "http://localhost:8081/user/"+id,
        success: function (){
            showListUser(role);
        }
    });
    event.preventDefault();
}
function showListGrade(a){
    if (a){
        pageGrade++;
    }
    else {
        pageGrade--;
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: "http://localhost:8081/grade/page?page="+pageGrade,
        success: function (data){
            console.log(data);
            let content = `<table class= "table table-dark table-hover"><tr><th>Name</th><th style="text-align: center" colspan="4">Action</th></tr>`;
            for (let i = 0; i < data.content.length; i++){
                content += getGradeMinistry(data.content[i]);
            }
            content += `</table>`;
            document.getElementById("showListUser").innerHTML = content;
        }
    });
    event.preventDefault();
}
function getGradeMinistry(grade){
    return `<tr><td>${grade.name}</td><td><a href="${grade.id}" onclick="showListUserByGrade(this)">Show list user</a></td><td><a href="${grade.id}" onclick="showListBlog(this)">Show blog</a></td><td><a href="#">Edit</a></td><td><a href="">Delete</a></td></tr>`;
}
function showListUserByGrade(a){
    let id = a.getAttribute("href");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: "http://localhost:8081/grade/user/"+id,
        success: function (data) {
            console.log("data = " + data);
            let content = `<table class="table table-dark table-hover"><tr><th>Name</th><th>Code</th><th>Email</th><th>Phone</th><th>Image</th><th colspan="2">Action</th></tr>`;
            for (let i = 0; i < data.length; i++){
                content += getUserByGrade(data[i], a)
            }
            content += `</table>`;
            document.getElementById("showListUser").innerHTML = content;
        }
    });
    event.preventDefault();
}
function getUserByGrade(user, a){
    return `<tr><td>${user.name}</td><td>${user.code}</td><td>${user.email}</td><td>${user.phone}</td><td>${user.image}</td><td><a href="">Edit</a></td><td><a id="grade" name="${a}" href="${user.id}" onclick="deleteUserST(this)">Delete</a></td></tr>`;
}
function showListBlog(a){
    let id = a.getAttribute("href");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: "http://localhost:8081/grade/blog/"+id,
        success: function (data){
            console.log("blogs = "+data);
            let content = `<table class="table table-dark table-hover"><tr><th>Title</th><th>Content</th><th>Date</th></tr>`;
            for (let i = 0; i < data.length; i++){
                content += showBlog(data[i]);
            }
            content += `</table>`;
            document.getElementById("showListUser").innerHTML = content;
        }
    });
    event.preventDefault();
}
function showBlog(blog){
    console.log(blog)
    return `<tr><td>${blog.title}</td><td>${blog.content}</td><td>${blog.date}</td></tr>`;
}
function deleteUserST(b){
    let id = b.getAttribute("href");
    let a = document.getElementById("grade").name;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "DELETE",
        url: "http://localhost:8081/user/"+id,
        success: function (){
            showListUserByGrade(a);
        }
    });
    event.preventDefault();
}