document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const manv = urlParams.get("manv");
    const role = urlParams.get("role");
  
    if (!manv || !role) {
      alert("Thiếu thông tin nhân viên!");
      window.location.href = "employee.html";
      return;
    }
  
    let storageKey = "";
    if (role === "accountant") storageKey = "dsAccountant";
    else if (role === "supervisor") storageKey = "dsSupervisor";
    else storageKey = "dsSeller";
  
    let dsNhanVien = JSON.parse(localStorage.getItem(storageKey)) || [];
    const nhanVien = dsNhanVien.find(nv => nv.manv === manv);
  
    if (!nhanVien) {
      alert("Không tìm thấy nhân viên!");
      window.location.href = "employee.html";
      return;
    }
  
    document.getElementById("manv").value = nhanVien.manv;
    document.getElementById("tennv").value = nhanVien.tennv;
    document.getElementById("date").value = nhanVien.date;
    document.getElementById("role").value = nhanVien.role;
  
    // Hiển thị hợp đồng nếu có
    if (role === "accountant" || role === "supervisor") {
      document.getElementById("hopDong").value = nhanVien.hopDong || "BHYT";
    } else {
      document.getElementById("labelHopDong").style.display = "none";
    }
  
    document.getElementById("editEmployeeForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const updatedNhanVien = {
        manv: document.getElementById("manv").value,
        tennv: document.getElementById("tennv").value,
        date: document.getElementById("date").value,
        role: document.getElementById("role").value,
        hopDong: (role === "accountant" || role === "supervisor") ? document.getElementById("hopDong").value : null
      };
  
      const index = dsNhanVien.findIndex(nv => nv.manv === manv);
      if (index !== -1) {
        dsNhanVien[index] = updatedNhanVien;
        localStorage.setItem(storageKey, JSON.stringify(dsNhanVien));
        alert("Đã cập nhật thông tin nhân viên!");
  
        if (role === "accountant") window.location.href = "accountant_employee.html";
        else if (role === "supervisor") window.location.href = "supervisor_employee.html";
        else window.location.href = "sale_employee.html";
      } else {
        alert("Lỗi: Không thể cập nhật.");
      }
    });
  });
  