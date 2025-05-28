document.addEventListener("DOMContentLoaded", function () {

    fetch("http://127.0.0.1:5000/audit", { credentials: "include" })
    .then(response => {
        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu log");
        }
        return response.json();
    })
    .then(data => {
        // Kiểm tra nếu có lỗi từ backend
        if (data.error) {
            alert(data.error);
            return;
        }

        // Đổ dữ liệu vào bảng
        const tbody = document.querySelector("#logTable tbody");
        data.forEach(log => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${log.log_id}</td>
                <td>${log.table_name}</td>
                <td>${log.action_type}</td>
                <td>${log.changed_by_user_id}</td>
                <td>${log.details}</td>
                <td>${new Date(log.change_date).toLocaleString()}</td>
                <td><button class="btn btn-danger" onclick="deleteLog('${log.log_id}')">Xoá</button></td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(err => {
        console.error(err);
        alert("Đã xảy ra lỗi khi tải dữ liệu log");
    });

    function deleteLog(logID) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xoá Log này không?");
      if (!confirmDelete) return;

      const logs = getLogs();
      const updatedLogs = logs.filter(log => log.LogID !== logID);
      saveLogs(updatedLogs);
      renderLogTable();
    }
});

