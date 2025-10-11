// === ระบบจัดการตะกร้าสินค้า (Cart Management) ===

/**
 * ดึงข้อมูลตะกร้าสินค้าจาก localStorage
 * @returns {Array} ข้อมูลสินค้าในตะกร้า
 */
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * บันทึกข้อมูลตะกร้าสินค้าลงใน localStorage
 * @param {Array} cart - ข้อมูลตะกร้าที่ต้องการบันทึก
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount(); // อัปเดตตัวเลขบนไอคอนทุกครั้งที่บันทึก
}

/**
 * อัปเดตตัวเลขจำนวนสินค้าบนไอคอนตะกร้าใน Navbar
 */
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cart-count');
  if (cartCountElements.length > 0) {
    const cart = getCart();
    cartCountElements.forEach(el => {
      el.textContent = `ตะกร้า (${cart.length})`;
    });
  }
}

/**
 * เพิ่มสินค้าลงในตะกร้า
 * @param {object} product - object สินค้าจาก products.js
 * @param {Date} startDate - วันที่เริ่มเช่า
 * @param {Date} endDate - วันที่คืน
 */
function addToCart(product, startDate, endDate) {
  const cart = getCart();

  // คำนวณจำนวนวันเช่า (บวก 1 เพราะนับวันแรกด้วย)
  const oneDay = 24 * 60 * 60 * 1000;
  const rentDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;
  const totalPrice = product.price * rentDays;

  const newItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    startDate: startDate.toISOString().split('T')[0], // แปลงเป็น YYYY-MM-DD
    endDate: endDate.toISOString().split('T')[0],   // แปลงเป็น YYYY-MM-DD
    rentDays: rentDays,
    totalPrice: totalPrice,
    cartItemId: Date.now() // สร้าง ID ที่ไม่ซ้ำกันสำหรับแต่ละรายการในตะกร้า เพื่อให้ลบง่าย
  };

  cart.push(newItem);
  saveCart(cart);
  alert(`'${product.name}' ถูกเพิ่มลงในตะกร้าแล้ว!`);
  window.location.href = 'cart.html'; // ไปยังหน้าตะกร้าทันที
}

/**
 * ลบสินค้าออกจากตะกร้า
 * @param {number} cartItemId - ID ของรายการสินค้าในตะกร้า
 */
function removeFromCart(cartItemId) {
  let cart = getCart();
  cart = cart.filter(item => item.cartItemId !== cartItemId);
  saveCart(cart);
  renderCartPage(); // โหลดหน้าตะกร้าใหม่อีกครั้ง
}

/**
 * แสดงผลข้อมูลสินค้าในหน้า cart.html
 */
function renderCartPage() {
  const cart = getCart();
  const container = document.getElementById('cart-items-list');
  const summaryBox = document.getElementById('cart-summary-box');
  const totalDiv = document.getElementById('cart-total');
  
  if (!container || !summaryBox) return; // ออกถ้าไม่ใช่หน้า cart.html

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>ยังไม่มีสินค้าในตะกร้า</p>
        <a href="track.html" class="rent-btn">เลือกดูอุปกรณ์</a>
      </div>`;
    summaryBox.style.display = 'none'; // ซ่อนกล่องสรุปยอดเมื่อไม่มีของ
    return;
  }
  
  summaryBox.style.display = 'block';
  let totalAmount = 0;
  container.innerHTML = cart.map(item => {
    totalAmount += item.totalPrice;
    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>วันที่: ${item.startDate} ถึง ${item.endDate}</p>
          <p>จำนวน: ${item.rentDays} วัน</p>
          <p>ราคา: ${item.totalPrice.toLocaleString('th-TH')} บาท</p>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.cartItemId})">&times;</button>
      </div>
    `;
  }).join('');

  totalDiv.textContent = `${totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท`;
}

// เรียกใช้ฟังก์ชันอัปเดตตัวเลขบนไอคอนทุกครั้งที่หน้าเว็บโหลด
document.addEventListener('DOMContentLoaded', updateCartCount);