let currentUser = JSON.parse(localStorage.getItem("currentUser"));
function successHandler1() {

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+currentUser.token,
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
            document.getElementById('info-ministry').innerHTML = content;
        }
    });
    event.preventDefault();
}
function getGrade(grade) {
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
            'Authorization': 'Bearer '+currentUser.token,
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