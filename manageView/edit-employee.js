document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const manv = urlParams.get("manv");
    const currentRole = urlParams.get("role"); // Vai trò ban đầu
  
    if (!manv || !currentRole) {
      alert("Thiếu thông tin nhân viên!");
      return;
    }
  
    const roleSelect = document.getElementById("role");
    const labelHopDong = document.getElementById("labelHopDong");
    const form = document.getElementById("editEmployeeForm");
  
    // Hiển thị/ẩn hợp đồng
    roleSelect.addEventListener("change", function () {
      const selected = this.value;
      if (selected === "accountant" || selected === "supervisor") {
        labelHopDong.style.display = "block";
      } else {
        labelHopDong.style.display = "none";
      }
    });
  
    // Lấy key trong localStorage theo role
    function getKey(role) {
      if (role === "accountant") return "dsAccountant";
      if (role === "supervisor") return "dsSupervisor";
      return "dsSeller";
    }
  
    // Load dữ liệu từ localStorage
    const oldList = JSON.parse(localStorage.getItem(getKey(currentRole))) || [];
    const employee = oldList.find(nv => nv.manv === manv);
  
    if (!employee) {
      alert("Không tìm thấy nhân viên!");
      return;
    }
  
    // Hiển thị dữ liệu cũ
    document.getElementById("manv").value = employee.manv;
    document.getElementById("tennv").value = employee.tennv;
    document.getElementById("date").value = employee.date;
    document.getElementById("role").value = employee.role;
    if (employee.role === "accountant" || employee.role === "supervisor") {
      document.getElementById("hd").value = employee.hopDong || "BHYT";
      labelHopDong.style.display = "block";
    }
  
    // Xử lý cập nhật khi submit
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const newRole = document.getElementById("role").value;
      const newKey = getKey(newRole);
      const oldKey = getKey(currentRole);
  
      const updatedEmployee = {
        manv: employee.manv,
        tennv: document.getElementById("tennv").value,
        date: document.getElementById("date").value,
        role: newRole,
        hopDong: (newRole === "accountant" || newRole === "supervisor")
          ? document.getElementById("hd").value
          : null
      };
  
      // Xoá khỏi danh sách cũ
      let oldListUpdated = oldList.filter(nv => nv.manv !== manv);
      localStorage.setItem(oldKey, JSON.stringify(oldListUpdated));
  
      // Thêm vào danh sách mới
      const newList = JSON.parse(localStorage.getItem(newKey)) || [];
      const index = newList.findIndex(nv => nv.manv === manv);
      if (index !== -1) {
        newList[index] = updatedEmployee; // Nếu đã có (trùng mã), ghi đè
      } else {
        newList.push(updatedEmployee);
      }
      localStorage.setItem(newKey, JSON.stringify(newList));
  
      alert("Đã cập nhật thông tin nhân viên!");
  
      // Điều hướng
      if (newRole === "accountant") {
        window.location.href = "accountant_employee.html";
      } else if (newRole === "supervisor") {
        window.location.href = "supervisor_employee.html";
      } else {
        window.location.href = "sale_employee.html";
      }
    });
  });
  