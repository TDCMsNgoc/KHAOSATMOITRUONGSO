// CẤU HÌNH KẾT NỐI SERVER / GITHUB PAGES
// - Khi chạy trên máy Local: để trống GOOGLE_SCRIPT_URL: "" (hệ thống tự gọi local server)
// - Khi đưa lên GitHub Pages: dán link Web App từ Google Apps Script vào đây để lưu dữ liệu vào Google Sheet
const CONFIG = {
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbyKv7-rTeog8M8mqB4y05IDWS0Rkc4AjeiZrKEXU0FJM74pai4X1QXjr2Osp-00UG1UbQ/exec"
};

window.CONFIG = CONFIG;
