let currentUser = JSON.parse(localStorage.getItem("currentUser"));
$(document).ready(function () {
    document.getElementById("infoStudent1").innerHTML = currentUser.name;
    document.getElementById("emailStudent1").innerHTML = currentUser.email;
    document.getElementById("phoneStudent1").innerHTML = currentUser.phone;
})

let score = [];

function showInfo() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token,
        },
        type: "GET",
        url: 'http://localhost:8081/user/' + currentUser.id,
        success: function (data) {
            console.log(data)
            let content = `<table border="1" class="table table-dark table-holver" style="background: #f5f0f0"><div class="container">` +
                `<div class="col-md-6 aboutleft" ">` +
                `<h3>Welcome to Student Info</h3>` +
                `<div>` +
                `<tr>` +
                `<th>Name</th>` +
                `<th>Email</th>` +
                `<th>Code</th>` +
                `<th>Phone</th>` +
                `</tr>`;
            content += `<tr>` +
                `<td>${data.name}</td>` +
                `<td>${data.email}</td>` +
                `<td>${data.code}</td>` +
                `<td>${data.phone}</td>` +
                `</tr>`;
            document.getElementById("info-student").innerHTML = content;
        }
    })

}

function getScore(score) {
    return `<tbody>
<tr>
<td>${score.math}</td>
<td>${score.literature}</td>
<td>${score.physics}</td>
</tr>
</tbody>`
}

function showScore() {
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token,
        },
        type: "GET",
        url: `http://localhost:8081/score/` + 1,
        success: function (data) {
            score = data;
            let content =
                `<table border="1" class="table table-dark table-holver" style="background: rgba(248,242,242,0.95)"><div class="container">` +
                `<div class="col-md-6 aboutleft" >` +
                `<h3>Welcome to Student Score</h3>` +
                // `<div className="col-md-2 aboutright">
                // 	<img src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/246629013_354835903082456_5410402453939892304_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=dbeb18&_nc_ohc=fOaPUm7UA3kAX_0LBSa&tn=any9z_yv8uLhTsbB&_nc_ht=scontent.fhan2-4.fna&oh=00_AT-wFly1xkRpfdOi8bj86P5rxnur3ZQ2caSqBt4IsPRDCA&oe=61C50AF1"
                // 		 alt=""/>
                // </div>`+
                `<div>` +
                `<tr>` +
                `<th>Math</th>` +
                `<th>Literature</th>` +
                `<th>Physics</th>` +
                `</tr>`;
            for (let i = 0; i < data.length; i++) {
                content += getScore(data[i])

            }
            document.getElementById("info-student").innerHTML = content;
        }
    })
    event.preventDefault();
}

function savePass() {
    let oldPass = $('#oldPass').val();
    let newPass = $('#newPass').val();
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + currentUser.token,
        },
        type: "PUT",
        url: `http://localhost:8081/user/changePassword/` + currentUser.id + "/" + oldPass + "/" + newPass,
        success:
            function (data) {
                console.log(data+"hello");
                let content = `${data}`;
                document.getElementById("editPass").innerHTML = content;
            }
    })
    event.preventDefault();
}

function editPass() {
    let content = `<div id="editPass">
    <h3>Edit Password</h3>
    <input type="text" placeholder="enter old pass" id="oldPass"><br>
    <input type="password" placeholder="enter new pass" id="newPass"><br>
    <input type="submit" value="Edit" onclick="savePass()">
    </div>`;
    document.getElementById("info-student").innerHTML = content;
}
function logOut(){
    window.localStorage.clear();
    window.location.href = "http://localhost:63342/CaseStudy4-Education-Manager-FE/index.html";
}