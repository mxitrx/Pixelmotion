document.addEventListener('DOMContentLoaded', () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFxzJfM1GZjc1HsvGLpsUYYSRLQj59WFKz-wWsW-bpxRpQrlyme_k8SILvPFZ-FCJF/exec"; // <-- ใส่ URL ใหม่!
  // ดึง Secret Key ที่เก็บไว้จากหน้า login
  const ADMIN_KEY = sessionStorage.getItem('adminSecretKey');

  const loader = document.getElementById('loader');
  const table = document.getElementById('ordersTable');
  const tableBody = document.getElementById('ordersBody');

  // ถ้าไม่มี Key (เช่น เข้ามาที่หน้านี้โดยตรง) ให้ส่งกลับไปหน้า login
  if (!ADMIN_KEY) {
    window.location.href = 'login.html';
    return;
  }
  
  // Fetch all orders from Google Sheet
  fetch(`${SCRIPT_URL}?action=getOrders&key=${ADMIN_KEY}`)
    .then(response => response.json())
    .then(res => {
      if (res.result === "success") {
        loader.style.display = 'none';
        table.style.display = 'table';
        populateTable(res.data);
      } else {
        throw new Error(res.message);
      }
    })
    .catch(error => {
      loader.textContent = `Error: ${error.message}`;
      console.error('Fetch error:', error);
    });

  // Function to build the table rows
  function populateTable(orders) {
    tableBody.innerHTML = ''; // Clear existing rows
    orders.forEach(order => {
      const row = document.createElement('tr');
      const formattedDate = new Date(order.Timestamp).toLocaleString('th-TH');
      
      row.innerHTML = `
        <td>${order.TransactionID.split('-')[0]}</td>
        <td>${formattedDate}</td>
        <td>${order.Fullname} <br><small>${order.Phone}</small></td>
        <td>${order.Item}</td>
        <td>${parseFloat(order.Amount).toLocaleString('th-TH')}</td>
        <td>
          <select class="status-select" data-id="${order.TransactionID}">
            <option value="Pending" ${order.Status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${order.Status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Cancelled" ${order.Status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      `;
      // Add a class to the row based on status for styling
      row.querySelector('.status-select').classList.add(`status-${order.Status}`);
      tableBody.appendChild(row);
    });

    // Add event listeners to all select dropdowns
    document.querySelectorAll('.status-select').forEach(select => {
      select.addEventListener('change', updateStatus);
    });
  }

  // Function to handle status update
  function updateStatus(event) {
    const selectElement = event.target;
    const transactionId = selectElement.dataset.id;
    const newStatus = selectElement.value;
    
    selectElement.disabled = true; // Prevent multiple clicks

    fetch(`${SCRIPT_URL}?action=updateStatus&key=${ADMIN_KEY}&id=${transactionId}&status=${newStatus}`)
      .then(response => response.json())
      .then(res => {
        if (res.result !== "success") {
          throw new Error(res.message);
        }
        // Update class for color feedback
        selectElement.className = 'status-select'; // Reset classes
        selectElement.classList.add(`status-${newStatus}`);
      })
      .catch(error => {
        alert(`Failed to update status: ${error.message}`);
      })
      .finally(() => {
        selectElement.disabled = false; // Re-enable select
      });
  }
});