document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("#userTable tbody");
  
    // Lấy danh sách user từ localStorage hoặc file gốc
    let dsUser = JSON.parse(localStorage.getItem("dsUser")) || User;
  
    function saveAndRender() {
      localStorage.setItem("dsUser", JSON.stringify(dsUser));
      renderTable();
    }
  
    function renderTable() {
      tableBody.innerHTML = "";
  
      dsUser.forEach(user => {
        const tr = document.createElement("tr");
  
        tr.innerHTML = `
          <td>${user.Id}</td>
          <td>${user.Fullname}</td>
          <td>${user.Date}</td>
          <td>
            <span class="${user.State === 'online' ? 'text-success' : 'text-secondary'}">${user.State}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-info btn-toggle" data-id="${user.Id}">Chuyển trạng thái</button>
            <button class="btn btn-sm btn-danger btn-delete" data-id="${user.Id}">Xoá</button>
          </td>
        `;
  
        tableBody.appendChild(tr);
      });
  
      // Gán sự kiện cho nút
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", function () {
          const id = this.dataset.id;
          if (confirm("Bạn có chắc muốn xoá user này?")) {
            dsUser = dsUser.filter(u => u.Id !== id);
            saveAndRender();
          }
        });
      });
  
      document.querySelectorAll(".btn-toggle").forEach(btn => {
        btn.addEventListener("click", function () {
          const id = this.dataset.id;
          const user = dsUser.find(u => u.Id === id);
          if (user) {
            user.State = user.State === "online" ? "offline" : "online";
            saveAndRender();
          }
        });
      });
    }
  
    renderTable();
  });
  