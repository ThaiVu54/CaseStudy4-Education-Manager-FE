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
            content+=`<div><button onclick="back()">back</button></div>`;
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
                <td><img src="" alt="" width="50" height="50"></td>
            </tr>` +
        `<tr>
                    <button onclick="deleteMinistry(${ministry.id})">Delete</button>
                    <button><a href="#">Update</a></button>
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

function back(){
    document.getElementById("info-ministry").innerHTML = `<h3>Welcome to E-Progress</h3>
<h4><a href="http://localhost:8081/user/createForm">Create User</a></h4>
<a href="#" onclick="successHandler()">Ministry Manager</a></br>
<a href="#" onclick="successHandler1()">Class Manager</a></br>
</div>
<div class="col-md-6 aboutright">
</div>
<div class="clearfix"></div>`
}