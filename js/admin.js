function successHandler() {

    $.ajax({
        headers: {
            'Accept': 'application/json',
        },
        type: 'GET',
        url: 'http://localhost:8081/user/ministryByRole/3',
        success: function (ministry) {
            console.log("data=" + ministry);
            let content = ``;
            for (let i = 0; i < ministry.length; i++) {
                content += getMinistry(ministry[i]);
            }
            content += `<div><button onclick="back()">back</button></div>`;
            document.getElementById('info-ministry').innerHTML = content;
        }
    });
    event.preventDefault();
}


function getMinistry(ministry) {
    return `   <h3>Welcome to E-Progress</h3>
   <table border="1" class="table table-hover">
            <tr>
                <th>Ministry Name</th>
                <th>Ministry Email</th>
                <th>Ministry Phone</th>
                <th>Ministry Username</th>
                <th>Ministry Image</th>
           </tr>
            <tr>
                <td>${ministry.name}</td>
                <td>${ministry.email}</td>
                <td>${ministry.phone}</td>
                <td>${ministry.username}</td>
                <td><img src="http://localhost:8081/getimage/${ministry.image}" alt="" width="50" height="50"></td>
            </tr>` +
        `<tr>
                    <button onclick="deleteMinistry(${ministry.id})">Delete</button>
                    <button><a href="http://localhost:8081/user/admin/edit/${ministry.id}">Update</a></button>
                </tr>
        </table>`
}

function deleteMinistry(ministryId) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8081/user/${ministryId}`,
        success: function () {
            successHandler();
        }
    });
    event.preventDefault();
}

function back() {
    document.getElementById("info-ministry").innerHTML = `
<div>
<h3>Welcome to E-Progress</h3>
<button><a href="http://localhost:8081/user/createAdminForm">Create User</a></button>
<button><a href="#" onclick="successHandler()">Ministry Manager</a></br></button>
<button><a href="#" onclick="successHandler1()">Class Manager</a></br></button>
</div>
<div class="col-md-6 aboutright">
</div>
<div class="clearfix"></div>`
}

function successHandler1() {

    $.ajax({
        headers: {
            'Accept': 'application/json',
        },
        type: 'GET',
        url: 'http://localhost:8081/grade',
        success: function (grade) {
            console.log("data=" + grade);
            let content = `<table border="1" class="table table-hover">`;
            content+=`<tr>
                <th>grade Name</th>
                <th colspan="3">Action</th>
           </tr>`;
            for (let i = 0; i < grade.length; i++) {
                content += getGrade(grade[i]);
            }
            content+=`<div><button onclick="back()">back</button></div>`;
            content+=`</table>`;
            document.getElementById("info-ministry").innerHTML = content;
        }
    });
    event.preventDefault();
}
function getGrade(grade){
    return `
            <tr>
                <td>${grade.name}</td>
                    <td><button onclick="deleteGrade(${grade.id})">Delete</button></td>
                    <td><button><a href="#">Update</a></button></td>
                    <td><button onclick="showListStudentByClass(${grade.id})">List Student</button></td>
            </tr>` +
        `<tr>
                </tr>
        `
}

function showListStudentByClass(idG){
    $.ajax({
        headers: {
            'Accept': 'application/json',
        },
        type: 'GET',
        url: 'http://localhost:8081/grade/'+idG,
        success: function (grade) {
            console.log("data=" + grade);
            let content = `<table border="1" class="table table-hover">`;
            content+=`<tr>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Student Phone</th>
                <th>Student Username</th>
                <th colspan="2">Action</th>
           </tr>`;
            for (let i = 0; i < grade.user.length; i++) {
                content += getStudent(grade.user[i]);
            }
            content+=`<div><button onclick="back()">back</button></div>`;
            content+=`</table>`;
            document.getElementById('info-ministry').innerHTML = content;
        }
    });
    event.preventDefault();
}

function getStudent(list) {
    return `  
            <tr>
                <td>${list.name}</td>
                <td>${list.email}</td>
                <td>${list.phone}</td>
                <td>${list.username}</td>
                    <td><button onclick="deleteMinistry(${list.id})">Delete</button></td>
                    <td><button><a href="#">Update</a></button></td>
            </tr>`

}