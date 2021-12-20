let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let scores = [];
function successHandlerBlog() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: 'GET',
        url: 'http://localhost:8081/blog/view',
        success: function (data) {
            let content = "";
            for (var i = 0; i < data.length; i++) {
                content += `<h4 style="cursor: pointer" href="${data[i].id}" onclick="showViewBlog(this)" >${data[i].title}</h4><hr>`

            }
            document.getElementById("title-blog").innerHTML = content;
        }
    })
}
function showViewBlog(a) {
    let blogId = a.getAttribute("href");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: "http://localhost:8081/blog/" + blogId,
        success: function (blog) {
            let content = `<div>
                <p><i class="far fa-calendar-alt"></i></p>
                <p>${blog.date}</p>
            </div>
            <div>
                <h3>${blog.title}</h3>
            </div>

            <div>
                <p>Content:</p>
                <p>${blog.content}</p>
            </div>
            <div>
            <button href="${blog.id}" onclick="editBlog(this)">Edit</button>
            <button href="${blog.id}" onclick="deleteBlog(this)">Delete</button>
            </div>    `
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

//----------------------------DELETE BLOG----------------------------//
function deleteBlog(a) {
    let idBlog = a.getAttribute("href");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "DELETE",
        url: 'http://localhost:8081/blog/' + idBlog,
        success: function (message) {
            let content = `<h3>${message}</h3>`
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

//----------------------------EDIT BLOG------------------------------//
function editBlog(a) {
    let id = a.getAttribute("href");
    let content = ` <div>
                <input type="hidden" id="nblogId">
                <h3>Edit Blog</h3>
                <p>Title</p>
                <input type="text" id="ntitle">
                <p>Date</p>
                <input type="date" id="ndate">
                <p>Content</p>
                <p><textarea id="nnd" cols="60" rows="30"></textarea></p>
                <input type="submit" value="Edit" onclick="saveBlog()">
               <a href="teacher.html" data-hover="About">Cancel</a>
            </div>`
    document.getElementById("content-blog").innerHTML = content;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: "http://localhost:8081/blog/" + id,
        success: function (blog) {
            $('#nblogId').val(blog.id);
            $('#ntitle').val(blog.title);
            $('#ndate').val(blog.date);
            $('#nnd').val(blog.content);
        }
    })
    event.preventDefault();
}

function saveBlog() {
    let newIdBlog = $('#nblogId').val();
    let newTitle = $('#ntitle').val();
    let newDate = $('#ndate').val();
    let newContent = $('#nnd').val();
    let newBlog = {
        id: newIdBlog,
        title: newTitle,
        content: newContent,
        date: newDate
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "POST",
        data: JSON.stringify(newBlog),
        url: "http://localhost:8081/blog",
        //-----edit thành công nhưng chưa hiện thị thông báo ra ngoài được----//
        success: function (message) {
            let content = `<h3>${message}</h3>`
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

//----------------------CREATE BLOG-------------------------//
function createNewBlog() {
    let title = $('#title').val();
    let content = $('#nd').val();
    let date = $('#date').val();
    let newBlog = {
        title: title,
        content: content,
        date: date
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        data: JSON.stringify(newBlog),
        type: "POST",
        url: "http://localhost:8081/blog",
        success: successHandlerBlog
    })
    event.preventDefault();
}

function showCreateFormBlog() {
    let content =
        `<div id="formCreate">
                            \t<h3>Create New Blog</h3>
                            \t<p>Title</p>
                            \t<input type="text" id="title">
                            \t<p>Date</p>
                            \t<input type="date" id="date">
                            \t<p>Content</p>
                            \t<p><textarea id="nd" cols="60" rows="30"></textarea></p>
                            \t<input type="submit" onclick="createNewBlog()">
                            </div>
		`
    document.getElementById("content-blog").innerHTML = content;
}

//--------------------------SHOW GRADE-----------------//
function showGrade() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: 'GET',
        url: 'http://localhost:8081/grade/gradeByUser/' + 1,
        success: function (data) {
            let content = `<h3>My Grade</h3> <input type="text" placeholder="Enter Student Code" id="searchCode">
                        <input type="button" onclick="findByCode()" value="Search"> <input type="button" onclick="scoreChart()" value="Score chart">
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Code</th>
    </tr>
    </thead>`
            for (let i = 0; i < data.user.length; i++) {
                if (data.user[i].role.name == "teacher") {
                    continue;
                }
                content += getStudent(data.user[i]);
            }
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

function getStudent(student) {
    return `<tbody>
    <tr>
      <td style="cursor: pointer" href="${student.id}" onclick="showStudentScore(this)">${student.name}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.code}</td>
    </tr></tbody>`;
}
//-----------------------------CHART-----------------------------//
function  scoreChart(){
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: 'GET',
        url: 'http://localhost:8081/score/list',
        success: function (data){
            scores = data;
            let content =`
<h3>Score Chart</h3>
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Math</th>
      <th scope="col">Literature</th>
      <th scope="col">Physics</th>
    </tr>
    </thead>`
            for (let i=0;i<data.length;i++){
                content+=getScore(data[i])
            }
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}
function sChart(){
    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    const config = {
        type: 'doughnut',
        data: data,
    };
    let ctx = document.getElementById("myScoreStartsChart").getContext("2d");
    new Chart(ctx,config)
}
window.onload = function (){
    sChart("myScoreStartsChart")
}

//---------------------SEARCH STUDENT BY CODE--------------//
function findByCode() {
    let code = $('#searchCode').val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: 'http://localhost:8081/user/search/' + code,
        success: function (student) {
            let content = `<h3>My Grade</h3> <input type="text" placeholder="Enter Student Code" id="searchCode">
                        <input type="button" onclick="findByCode()" value="Search">
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Code</th>
    </tr>
    </thead>`
            content += getStudent(student);
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

//----------------------SHOW STUDENT SCORE--------------//
function getScore(score) {
    return `<tbody>
    <tr>
      <td>${score.math}</td>
      <td>${score.literature}</td>
      <td>${score.physics}</td>
    </tr></tbody>`;
}

function showStudentScore(a) {
    let studentId = a.getAttribute("href");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: 'GET',
        url: 'http://localhost:8081/score/' + studentId,
        success: function (data) {
            let content = `<h3>Student Score</h3>
<input type="submit" value="Add Score" href="${studentId}" onclick="showFormAddScore(this)">
 <input type="submit" href="${studentId}" value="Count Avg" onclick="countAvg(this)">
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Math</th>
      <th scope="col">Literature</th>
      <th scope="col">Physics</th>
    </tr>
    </thead>`;
            for (let i = 0; i < data.length; i++) {
                content += getScore(data[i]);
            }
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}
//-------------------------------ADD SCORE STUDENT-----------------------//
function showFormAddScore(a) {
    let studentId = a.getAttribute("href");
    let content = `<div>
<h3>Add new score</h3>
    <p>Math:</p>
    <input type="text" id="mathN" >
    <p>Literature:</p>
    <input type="text" id="literatureN">
    <p>Physics</p>
    <input type="text" id="physicsN">
    <input type="submit" href="${studentId}" value="Add" onclick="addNewScore(this)">
</div>`
    document.getElementById("content-blog").innerHTML = content
}

//--------------------------------COUNT AVG SCORE-----------------------//
function countAvg(a) {
    let studentId = a.getAttribute("href");
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: 'GET',
        url: 'http://localhost:8081/score/' + studentId,
        success: function (data) {
            getCountAvgScore(data)
        }
    })
    event.preventDefault();
}

function getCountAvgScore(scores) {
    let avgScore = 0;
    let score = 0;
    for (let i = 0; i < scores.length; i++) {
        score += (scores[i].math + scores[i].literature + scores[i].physics)
    }
    avgScore = score / (scores.length * 3);
    let content = `<h4>AVG SCORE IS:</h4> <p>${avgScore}</p>`
    document.getElementById("content-blog").innerHTML = content;
}

//--------------------------ADD NEW SCORE--------------------//
function addNewScore(a) {
    let studentId = a.getAttribute("href");
    let math = $('#mathN').val();
    let literature = $('#literatureN').val();
    let physics = $('#physicsN').val();
    let newScore = {
        math: math,
        literature: literature,
        physics: physics
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        data: JSON.stringify(newScore),
        type: 'POST',
        url: 'http://localhost:8081/score/' + studentId,
        //------chưa hiển thị được message----------//
        success: function (message) {
            let content = `<h4>${message}</h4>`
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

//---------------------------SHOW INFO TEACHER----------------//
function showInfoTeacher() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: 'http://localhost:8081/user/' + currentUser.id,
        success: function (data) {
            let content = `<h3>My Info</h3> <input type="submit" href="${data.id}" value="Update" onclick="updateInfoTeacher(this)">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Code</th>
                            </tr>
                            </thead>`;
            content += `<tbody>
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.email}</td>
                        <td>${data.phone}</td>
                        <td>${data.code}</td>
                    </tr></tbody>`;
            document.getElementById("content-blog").innerHTML = content;
        }
    })
}

//------------------------UPDATE INFO TEACHER------------------//
function updateInfoTeacher(a) {
    let id = a.getAttribute("href");
    let content = ` <div>
                <input type="hidden" id="teacherId">
                <h3>Update Info</h3>
                <p>Name</p>
                <input type="text" id="nName">
                <p>Email</p>
                <input type="text" id="nEmail">
                <p>Phone</p>
                <input type="text" id="nPhone">
                <p>Code</p>
                <input type="text" id="nCode">
                <input type="submit" href="${id}" onclick="saveInfoTeacher(this)">
                </div>`
    document.getElementById("content-blog").innerHTML = content;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "GET",
        url: "http://localhost:8081/user/" + id,
        success: function (user) {
            $('#nName').val(user.name);
            $('#nEmail').val(user.email);
            $('#nPhone').val(user.phone);
            $('#nCode').val(user.code);
        }
    })
    event.preventDefault();
}

function saveInfoTeacher(a) {
    let id = a.getAttribute("href");
    let newName = $('#nName').val();
    let newEmail = $('#nEmail').val();
    let newPhone = $('#nPhone').val();
    let newCode = $('#nCode').val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "PUT",
        url: "http://localhost:8081/user/" + id + "/" + newName + "/" + newEmail + "/" + newPhone + "/" + newCode,
        success: function (data) {
            let content = `<h3>My Grade</h3> <input type="submit" href="${data.id}" value="Update" onclick="updateInfoTeacher(this)">
                        <table class="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Code</th>
                            </tr>
                            </thead>`;
            content += `<tbody>
                    <tr>
                        <td>${data.name}</td>
                        <td>${data.email}</td>
                        <td>${data.phone}</td>
                        <td>${data.code}</td>
                    </tr></tbody>`;
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}

//-----------------------EDIT PASS TEACHER---------------------//
function editPassTeacher() {
    let content = `<div id="editPass">
<h3>Edit Password</h3>
    <input type="text" placeholder="enter old pass" id="oldPass"><br>
    <input type="text" placeholder="enter new pass" id="newPass"><br>
    <input type="submit" value="Edit" onclick="savePass()">
</div>`
    document.getElementById("content-blog").innerHTML = content;
}

function savePass() {
    let newPass = $('#newPass').val();
    let oldPass = $('#oldPass').val();

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
        },
        type: "PUT",
        url: "http://localhost:8081/user/" + 1 + "/" + newPass + "/" + oldPass,
        success: function (data) {
            let content = `${data}`
            document.getElementById("content-blog").innerHTML = content;
        }
    })
    event.preventDefault();
}
//-----------------------------E--------------------------------//
successHandlerBlog();