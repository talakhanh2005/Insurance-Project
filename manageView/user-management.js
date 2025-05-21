// user-management.js

let userList = JSON.parse(localStorage.getItem("userData")) || User;
const tbody = document.querySelector("#userTable tbody");

function renderTable() {
  tbody.innerHTML = "";
  userList.forEach((user, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${user.Id}</td>
        <td>${user.Fullname}</td>
        <td>${user.Date}</td>
        <td>${user.State}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Xoá</button>
        </td>
      </tr>
    `;
  });
  localStorage.setItem("userData", JSON.stringify(userList));
}

function deleteUser(index) {
  if (confirm("Bạn chắc chắn xoá?")) {
    userList.splice(index, 1);
    renderTable();
  }
}

function showAddUserForm() {
  const formHTML = `
    <tr id="addUserRow">
      <td><input class="form-control" id="newId" placeholder="ID"/></td>
      <td><input class="form-control" id="newFullname" placeholder="Họ tên"/></td>
      <td><input type="date" class="form-control" id="newDate"/></td>
      <td>
        <select class="form-control" id="newState">
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </td>
      <td>
        <button class="btn btn-success btn-sm" onclick="addUser()">Lưu</button>
        <button class="btn btn-secondary btn-sm" onclick="cancelAddUser()">Huỷ</button>
      </td>
    </tr>
  `;
  tbody.insertAdjacentHTML("afterbegin", formHTML);
  document.getElementById("addBtn").disabled = true;
}

function cancelAddUser() {
  document.getElementById("addUserRow")?.remove();
  document.getElementById("addBtn").disabled = false;
}

function addUser() {
  const newUser = {
    Id: document.getElementById("newId").value,
    Fullname: document.getElementById("newFullname").value,
    Date: document.getElementById("newDate").value,
    State: document.getElementById("newState").value
  };
  userList.push(newUser);
  cancelAddUser();
  renderTable();
}

renderTable();
