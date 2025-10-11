// === ฐานข้อมูลสินค้า ===
// แก้ไข, เพิ่ม, หรือลบสินค้าได้จากไฟล์นี้ไฟล์เดียว
const products = [
  {
    id: 'P001',
    name: 'Panasonic AG-UX 180',
    image: 'image/agux.jpg',
    specs: 'กล้องวิดีโอ 4K ระดับมืออาชีพ เหมาะสำหรับงานโปรดักชันและไลฟ์สตรีม',
    price: 1500,
    priceText: '฿1,500/วัน'
  },
  {
    id: 'P002',
    name: 'DJI SDR Transmission',
    image: 'image/dji.jpg',
    specs: 'ชุดส่งสัญญาณภาพไร้สายคุณภาพสูง ความหน่วงต่ำ สำหรับงานวิดีโอ',
    price: 1000,
    priceText: '฿1,000/วัน'
  },
  {
    id: 'P003',
    name: 'Ulanzi VL119 Tube Light',
    image: 'image/ulanzi.webp',
    specs: 'ไฟ LED ท่อทรงกระบอก ให้แสงนุ่มนวล ปรับความสว่างและอุณหภูมิสีได้',
    price: 500,
    priceText: '฿500/วัน'
  },
  {
    id: 'P004',
    name: 'ZSYB CL-80Bi Softbox',
    image: 'image/zsyb.jpg',
    specs: 'ชุดไฟสตูดิโอให้แสงนุ่มนวล เหมาะสำหรับถ่ายภาพบุคคลและสินค้า',
    price: 500,
    priceText: '฿500/วัน'
  },
  // --- หากต้องการเพิ่มสินค้าใหม่ ให้คัดลอกรูปแบบด้านบนมาวางต่อท้ายตรงนี้ ---
  // {
  //   id: 'P004',
  //   name: 'สินค้าใหม่',
  //   image: 'path/to/new_image.jpg',
  //   specs: 'คำอธิบายสั้นๆ เกี่ยวกับสินค้า',
  //   price: 2000,
  //   priceText: '฿2,000/วัน'
  // }
];