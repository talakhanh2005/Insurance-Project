
let urlParams;

document.addEventListener("DOMContentLoaded", function () {
  urlParams = new URLSearchParams(window.location.search);
  const manv = urlParams.get("manv");
  const currentRole = urlParams.get("role");
  const name = urlParams.get("name");

  if (!manv || !currentRole) {
    alert("Thiếu thông tin nhân viên!");
    return;
  }

  const manvInput = document.getElementById("manv");
  const nameInput = document.getElementById("tennv");
  const roleSelect = document.getElementById("role");
  const labelHopDong = document.getElementById("labelHopDong");

  manvInput.value = manv;
  nameInput.value = name;
  roleSelect.value = currentRole;

  // Hiển thị hợp đồng nếu là Accountant hoặc Supervisor
  if (currentRole === "Accountant" || currentRole === "Supervisor") {
    labelHopDong.style.display = "block";
  }

  // Sự kiện thay đổi loại nhân viên
  roleSelect.addEventListener("change", function () {
    const selected = this.value;
    if (selected === "Accountant" || selected === "Supervisor") {
      labelHopDong.style.display = "block";
    } else {
      labelHopDong.style.display = "none";
    }
  });
});

document.getElementById("editEmployeeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  urlParams = new URLSearchParams(window.location.search);
  const manv = urlParams.get("manv");
  const fullName = document.getElementById("tennv").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;

  const isActive = status === "hd" ? 1 : 0;

  const updatedData = {
    full_name: fullName,
    role: role,
    is_active: isActive
  };

  fetch(`http://127.0.0.1:5000/users/${manv}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(updatedData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Lỗi khi cập nhật thông tin");
    }
    return response.json();
  })
  .then(data => {
    
    if(role === "Accountant"){
      window.location.href = "accountant_employee.html";
    }
    else if(role === "Supervisor"){
      window.location.href = "supervisor_employee.html";
    }
    else{
      window.location.href = "sale_employee.html";
    }
  })
  .catch(error => {
    console.error("Lỗi:", error);
  });
});

