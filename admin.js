// Admin and Analytics Dashboard Script
let allResponses = [];
let currentFilter = {
  faculty: "",
  year: "",
  search: ""
};

// Likert labels
const likertLabels = {
  1: "Không bao giờ",
  2: "Hiếm khi",
  3: "Thỉnh thoảng",
  4: "Thường xuyên",
  5: "Rất thường xuyên"
};

const c9Labels = {
  "1": "Dưới 15 phút",
  "2": "Từ 15 đến dưới 30 phút",
  "3": "Từ 30 đến dưới 60 phút",
  "4": "Từ 60 đến dưới 120 phút",
  "5": "Từ 120 phút trở lên"
};

const activityNames = {
  "B1_1": "B1.1 - Xem video, phim, show giải trí (YouTube, TikTok, Netflix...)",
  "B1_2": "B1.2 - Xem video hướng dẫn, bài giảng, nội dung chuyên môn",
  "B1_3": "B1.3 - Xem livestream trực tiếp tiếng Anh",
  "B2_1": "B2.1 - Nghe nhạc tiếng Anh",
  "B2_2": "B2.2 - Xem video âm nhạc (MV, biểu diễn, có lyrics)",
  "B2_3": "B2.3 - Chủ động tìm, đọc, tra cứu lời bài hát (lyrics)",
  "B2_4": "B2.4 - Hát theo hoặc hát các bài hát tiếng Anh",
  "B3_1": "B3.1 - Đọc tin tức tiếng Anh (BBC, CNN, Google News...)",
  "B3_2": "B3.2 - Đọc truyện, tiểu thuyết, blog số bằng tiếng Anh",
  "B3_3": "B3.3 - Nghe podcast tiếng Anh",
  "B3_4": "B3.4 - Nghe sách nói (audiobook) tiếng Anh",
  "B4_1": "B4.1 - Chơi game có sử dụng tiếng Anh",
  "B4_2": "B4.2 - Đọc hướng dẫn, nhiệm vụ, thoại trong game",
  "B4_3": "B4.3 - Giao tiếp với người chơi khác bằng tiếng Anh khi chơi",
  "B4_4": "B4.4 - Xem người khác chơi game / livestream game tiếng Anh",
  "B5_1": "B5.1 - Nhắn tin/chat tiếng Anh (Messenger, Zalo, Discord...)",
  "B5_2": "B5.2 - Bình luận/comment trên mạng xã hội bằng tiếng Anh",
  "B5_3": "B5.3 - Tham gia group/cộng đồng trực tuyến tiếng Anh",
  "B5_4": "B5.4 - Gọi thoại / video call bằng tiếng Anh",
  "B6_1": "B6.1 - Sáng tạo video / hình ảnh tiếng Anh chia sẻ online",
  "B6_2": "B6.2 - Sáng tạo âm thanh / podcast bằng tiếng Anh",
  "B6_3": "B6.3 - Viết bài, status, review tự tạo bằng tiếng Anh",
  "B7_1": "B7.1 - Tự nói một mình với bản thân bằng tiếng Anh",
  "B7_2": "B7.2 - Nghĩ / độc thoại nội tâm trong đầu bằng tiếng Anh",
  "B7_3": "B7.3 - Tưởng tượng một cuộc hội thoại bằng tiếng Anh",
  "B7_4": "B7.4 - Tự luyện nói tiếng Anh khi không có người khác",
  "B8_1": "B8.1 - Hoạt động tiếng Anh số đặc thù khác"
};

const likertDimNames = {
  "F_VIEW": "Viewing (Xem nội dung)",
  "F_MUSIC": "Music (Âm nhạc)",
  "F_RL": "Reading & Listening (Đọc và nghe)",
  "F_GAME": "Gaming (Trò chơi)",
  "F_SOCIAL": "Social Interaction (Tương tác xã hội)",
  "F_CREATIVE": "Digital Creativity (Sáng tạo số)",
  "F_INTERNAL": "Internalized (Nội tại/Suy nghĩ)",
  "F_NICHE": "Niche / Other (Khác)"
};

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
});

// Setup actions
function setupEventListeners() {
  document.getElementById("btnRefresh").addEventListener("click", loadData);
  document.getElementById("btnSeed").addEventListener("click", generateMockData);
  document.getElementById("btnClear").addEventListener("click", clearAllData);

  // Search & Filters
  document.getElementById("filterFaculty")?.addEventListener("change", applyFilters);
  document.getElementById("filterYear")?.addEventListener("change", applyFilters);
  document.getElementById("searchBox")?.addEventListener("input", applyFilters);

  // Export Handlers (Hỗ trợ tải trực tiếp khi chạy trên GitHub Pages)
  document.getElementById("btnExportCsv")?.addEventListener("click", (e) => {
    if (window.CONFIG && window.CONFIG.GOOGLE_SCRIPT_URL && window.CONFIG.GOOGLE_SCRIPT_URL.trim() !== "") {
      e.preventDefault();
      exportToCsvClient();
    }
  });

  document.getElementById("btnExportJson")?.addEventListener("click", (e) => {
    if (window.CONFIG && window.CONFIG.GOOGLE_SCRIPT_URL && window.CONFIG.GOOGLE_SCRIPT_URL.trim() !== "") {
      e.preventDefault();
      const jsonContent = JSON.stringify(allResponses, null, 2);
      const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "KhaoSat_TiengAnh_So_TDC.json");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  });

  // Modal close
  document.getElementById("modalClose")?.addEventListener("click", closeModal);
  document.getElementById("detailModal")?.addEventListener("click", (e) => {
    if (e.target.id === "detailModal") closeModal();
  });
}

// Fetch responses from server or Google Sheets
async function loadData() {
  try {
    let endpoint = "/api/responses";
    if (window.CONFIG && window.CONFIG.GOOGLE_SCRIPT_URL && window.CONFIG.GOOGLE_SCRIPT_URL.trim() !== "") {
      endpoint = window.CONFIG.GOOGLE_SCRIPT_URL.trim();
    }
    const res = await fetch(endpoint);
    allResponses = await res.json();
    populateFacultyFilter();
    updateDashboardUI();
    applyFilters();
  } catch (err) {
    console.error("Error loading responses:", err);
    showAdminToast("Lỗi khi tải dữ liệu từ máy chủ", "error");
  }
}

// Client-side CSV Export (Hoạt động hoàn hảo cả trên GitHub Pages lẫn máy local)
function exportToCsvClient() {
  if (allResponses.length === 0) {
    showAdminToast("Chưa có dữ liệu để xuất!", "error");
    return;
  }

  const csvHeaders = [
    "ID", "Timestamp", "A1_NamHoc", "A1_NamHoc_Text", "A2_Khoa", "A2_Nganh", "A3_Internet",
    "B1_1", "B1_2", "B1_3",
    "B2_1", "B2_2", "B2_3", "B2_4",
    "B3_1", "B3_2", "B3_3", "B3_4",
    "B4_1", "B4_2", "B4_3", "B4_4",
    "B5_1", "B5_2", "B5_3", "B5_4",
    "B6_1", "B6_2", "B6_3",
    "B7_1", "B7_2", "B7_3", "B7_4",
    "B8_1", "B8_1_Text",
    "F_VIEW", "F_MUSIC", "F_RL", "F_GAME", "F_SOCIAL", "F_CREATIVE", "F_INTERNAL", "F_NICHE",
    "C9_ThoiGian", "C9_ThoiGian_Text"
  ];

  function escapeField(str) {
    if (str === null || str === undefined) return '""';
    return '"' + String(str).replace(/"/g, '""') + '"';
  }

  const rows = [csvHeaders.join(",")];
  const actKeys = [
    "B1_1", "B1_2", "B1_3",
    "B2_1", "B2_2", "B2_3", "B2_4",
    "B3_1", "B3_2", "B3_3", "B3_4",
    "B4_1", "B4_2", "B4_3", "B4_4",
    "B5_1", "B5_2", "B5_3", "B5_4",
    "B6_1", "B6_2", "B6_3",
    "B7_1", "B7_2", "B7_3", "B7_4",
    "B8_1"
  ];
  const likertKeys = ["F_VIEW", "F_MUSIC", "F_RL", "F_GAME", "F_SOCIAL", "F_CREATIVE", "F_INTERNAL", "F_NICHE"];

  allResponses.forEach(r => {
    const row = [
      escapeField(r.id),
      escapeField(r.timestamp),
      escapeField(r.A1_NamHoc),
      escapeField(r.A1_NamHoc_Text),
      escapeField(r.A2_Khoa),
      escapeField(r.A2_Nganh),
      escapeField(r.A3_Internet)
    ];

    actKeys.forEach(k => {
      row.push(r.activities && r.activities[k] ? r.activities[k] : 0);
    });
    row.push(escapeField(r.B8_1_Text || ""));

    likertKeys.forEach(k => {
      row.push(r.frequencies && r.frequencies[k] ? r.frequencies[k] : (r[k] || 1));
    });

    row.push(escapeField(r.C9_ThoiGian));
    row.push(escapeField(r.C9_ThoiGian_Text));

    rows.push(row.join(","));
  });

  const csvContent = "\uFEFF" + rows.join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "KhaoSat_TiengAnh_So_TDC.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Populate faculty filter dropdown
function populateFacultyFilter() {
  const select = document.getElementById("filterFaculty");
  if (!select) return;
  const currentVal = select.value;
  const faculties = Array.from(new Set(allResponses.map(r => r.A2_Khoa).filter(Boolean))).sort();

  select.innerHTML = '<option value="">-- Tất cả Khoa --</option>';
  faculties.forEach(fac => {
    const opt = document.createElement("option");
    opt.value = fac;
    opt.textContent = fac;
    select.appendChild(opt);
  });
  select.value = currentVal;
}

// Update KPI cards and statistical tables
function updateDashboardUI() {
  const total = allResponses.length;
  document.getElementById("statTotalResponses").textContent = total;

  if (total === 0) {
    document.getElementById("statHasInternet").textContent = "0%";
    document.getElementById("statTopFaculty").textContent = "Chưa có";
    document.getElementById("statAvgC9").textContent = "Chưa có";
    document.getElementById("statsPartA").innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 20px;">Chưa có dữ liệu khảo sát</div>';
    document.getElementById("statsPartB").innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 20px;">Chưa có dữ liệu khảo sát</div>';
    document.getElementById("statsPartC").innerHTML = '<div style="color: #94a3b8; text-align: center; padding: 20px;">Chưa có dữ liệu khảo sát</div>';
    return;
  }

  // A3 Internet usage %
  const internetCount = allResponses.filter(r => r.A3_Internet === "1" || r.A3_Internet === 1).length;
  const internetPct = Math.round((internetCount / total) * 100);
  document.getElementById("statHasInternet").textContent = `${internetPct}% (${internetCount}/${total})`;

  // Top Faculty
  const facCount = {};
  allResponses.forEach(r => {
    facCount[r.A2_Khoa] = (facCount[r.A2_Khoa] || 0) + 1;
  });
  let topFac = Object.entries(facCount).sort((a,b) => b[1] - a[1])[0];
  document.getElementById("statTopFaculty").textContent = topFac ? `${topFac[0]} (${topFac[1]})` : "Chưa có";

  // Average C9 time
  const c9Count = {};
  allResponses.forEach(r => {
    c9Count[r.C9_ThoiGian] = (c9Count[r.C9_ThoiGian] || 0) + 1;
  });
  let topC9 = Object.entries(c9Count).sort((a,b) => b[1] - a[1])[0];
  document.getElementById("statAvgC9").textContent = topC9 ? (c9Labels[topC9[0]] || "Mức " + topC9[0]) : "Chưa có";

  // Render Part A Demographics
  renderStatsPartA(total);

  // Render Part B Activity Breakdown
  renderStatsPartB(total);

  // Render Part C Likert Breakdown
  renderStatsPartC(total);
}

// Render Demographics (Part A)
function renderStatsPartA(total) {
  const container = document.getElementById("statsPartA");
  if (!container) return;

  // Year breakdown
  const yearCounts = { "Năm 1": 0, "Năm 2": 0, "Năm 3": 0, "Khác": 0 };
  allResponses.forEach(r => {
    const yr = r.A1_NamHoc_Text || ("Năm " + r.A1_NamHoc);
    if (yearCounts.hasOwnProperty(yr)) {
      yearCounts[yr]++;
    } else {
      yearCounts["Khác"]++;
    }
  });

  // Faculty breakdown
  const facultyCounts = {};
  allResponses.forEach(r => {
    const f = r.A2_Khoa || "Chưa rõ";
    facultyCounts[f] = (facultyCounts[f] || 0) + 1;
  });

  let html = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
      <!-- Year card -->
      <div style="background: #f8fafc; padding: 18px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h4 style="font-weight: 700; color: #1e3a8a; margin-bottom: 12px;">Cơ cấu theo Năm học (A1)</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
  `;

  for (const [yr, count] of Object.entries(yearCounts)) {
    const pct = ((count / total) * 100).toFixed(1);
    html += `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
          <span><strong>${yr}</strong>: ${count} sinh viên</span>
          <span>${pct}%</span>
        </div>
        <div class="bar-container">
          <div class="bar-bg"><div class="bar-fill" style="width: ${pct}%; background-color: #3b82f6;"></div></div>
        </div>
      </div>
    `;
  }

  html += `
        </div>
      </div>

      <!-- Faculty card -->
      <div style="background: #f8fafc; padding: 18px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h4 style="font-weight: 700; color: #1e3a8a; margin-bottom: 12px;">Cơ cấu theo Khoa (A2)</h4>
        <div style="display: flex; flex-direction: column; gap: 10px; max-height: 280px; overflow-y: auto;">
  `;

  const sortedFacs = Object.entries(facultyCounts).sort((a,b) => b[1] - a[1]);
  sortedFacs.forEach(([f, count]) => {
    const pct = ((count / total) * 100).toFixed(1);
    html += `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem; margin-bottom: 4px;">
          <span title="${f}"><strong>${f}</strong>: ${count} sv</span>
          <span>${pct}%</span>
        </div>
        <div class="bar-container">
          <div class="bar-bg"><div class="bar-fill" style="width: ${pct}%; background-color: #0ea5e9;"></div></div>
        </div>
      </div>
    `;
  });

  html += `
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// Render Part B Activity Breakdown
function renderStatsPartB(total) {
  const container = document.getElementById("statsPartB");
  if (!container) return;

  const activityCounts = {};
  Object.keys(activityNames).forEach(k => activityCounts[k] = 0);

  allResponses.forEach(r => {
    if (r.activities) {
      Object.keys(r.activities).forEach(k => {
        if (r.activities[k] === 1 || r.activities[k] === "1" || r.activities[k] === true) {
          activityCounts[k] = (activityCounts[k] || 0) + 1;
        }
      });
    }
  });

  // Sort by highest participation rate
  const sorted = Object.entries(activityCounts).sort((a,b) => b[1] - a[1]);

  let html = `
    <div style="overflow-x: auto;">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 10%;">Mã</th>
            <th style="width: 50%;">Nội dung hoạt động</th>
            <th style="width: 15%; text-align: center;">Số lượng đã làm</th>
            <th style="width: 25%;">Tỷ lệ tham gia (%)</th>
          </tr>
        </thead>
        <tbody>
  `;

  sorted.forEach(([code, count]) => {
    const pct = ((count / total) * 100).toFixed(1);
    const label = activityNames[code] || code;
    const isTop = (count / total) >= 0.5;

    html += `
      <tr>
        <td><strong style="color: #2563eb;">${code.replace('_', '.')}</strong></td>
        <td>${label}</td>
        <td style="text-align: center;"><strong>${count}</strong> / ${total}</td>
        <td>
          <div class="bar-container">
            <div class="bar-bg">
              <div class="bar-fill" style="width: ${pct}%; background-color: ${isTop ? '#10b981' : '#3b82f6'};"></div>
            </div>
            <span class="bar-percent">${pct}%</span>
          </div>
        </td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;
}

// Render Part C Likert Breakdown
function renderStatsPartC(total) {
  const container = document.getElementById("statsPartC");
  if (!container) return;

  let html = `
    <div style="overflow-x: auto; margin-bottom: 24px;">
      <table class="data-table">
        <thead>
          <tr>
            <th>Mã SPSS</th>
            <th>Tên nhóm hoạt động</th>
            <th style="text-align: center;">Điểm TB (Mean)</th>
            <th style="text-align: center;">Độ lệch chuẩn (SD)</th>
            <th style="text-align: center;">1 (Không bao giờ)</th>
            <th style="text-align: center;">2 (Hiếm khi)</th>
            <th style="text-align: center;">3 (Thỉnh thoảng)</th>
            <th style="text-align: center;">4 (Thường xuyên)</th>
            <th style="text-align: center;">5 (Rất TX)</th>
          </tr>
        </thead>
        <tbody>
  `;

  Object.entries(likertDimNames).forEach(([code, name]) => {
    const scores = [];
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    allResponses.forEach(r => {
      let val = null;
      if (r.frequencies && r.frequencies[code] !== undefined) {
        val = parseInt(r.frequencies[code], 10);
      } else if (r[code] !== undefined) {
        val = parseInt(r[code], 10);
      }
      if (val >= 1 && val <= 5) {
        scores.push(val);
        counts[val]++;
      }
    });

    const mean = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : "0.00";
    
    // Calculate Standard Deviation
    let sd = "0.00";
    if (scores.length > 1) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const variance = scores.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / (scores.length - 1);
      sd = Math.sqrt(variance).toFixed(2);
    }

    html += `
      <tr>
        <td><strong style="color: #0284c7;">${code}</strong></td>
        <td><strong>${name}</strong></td>
        <td style="text-align: center; font-weight: 700; color: #1e3a8a; font-size: 1.05rem;">${mean}</td>
        <td style="text-align: center; color: #64748b;">${sd}</td>
        <td style="text-align: center;">${counts[1]} <small style="color: #94a3b8;">(${((counts[1]/total)*100).toFixed(0)}%)</small></td>
        <td style="text-align: center;">${counts[2]} <small style="color: #94a3b8;">(${((counts[2]/total)*100).toFixed(0)}%)</small></td>
        <td style="text-align: center;">${counts[3]} <small style="color: #94a3b8;">(${((counts[3]/total)*100).toFixed(0)}%)</small></td>
        <td style="text-align: center;">${counts[4]} <small style="color: #94a3b8;">(${((counts[4]/total)*100).toFixed(0)}%)</small></td>
        <td style="text-align: center;">${counts[5]} <small style="color: #94a3b8;">(${((counts[5]/total)*100).toFixed(0)}%)</small></td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>

    <!-- C9 Distribution -->
    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 16px;">
      <h4 style="font-weight: 700; color: #1e3a8a; margin-bottom: 12px;">C9. Thời gian trung bình mỗi ngày dành cho tiếng Anh trên môi trường số:</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
  `;

  for (let opt = 1; opt <= 5; opt++) {
    const cCount = allResponses.filter(r => String(r.C9_ThoiGian) === String(opt)).length;
    const cPct = ((cCount / total) * 100).toFixed(1);
    html += `
      <div style="background: white; padding: 12px 14px; border-radius: 6px; border: 1px solid #e2e8f0;">
        <div style="font-weight: 600; font-size: 0.88rem; color: #334155; margin-bottom: 4px;">${c9Labels[opt]}</div>
        <div style="font-size: 1.3rem; font-weight: 800; color: #2563eb;">${cCount} <small style="font-size: 0.85rem; font-weight: 500; color: #64748b;">(${cPct}%)</small></div>
      </div>
    `;
  }

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// Filter responses and render table
function applyFilters() {
  const fac = document.getElementById("filterFaculty")?.value.toLowerCase() || "";
  const yr = document.getElementById("filterYear")?.value.toLowerCase() || "";
  const query = document.getElementById("searchBox")?.value.toLowerCase().trim() || "";

  const filtered = allResponses.filter(r => {
    const matchFac = !fac || (r.A2_Khoa && r.A2_Khoa.toLowerCase() === fac);
    const matchYr = !yr || (r.A1_NamHoc && String(r.A1_NamHoc) === yr) || (r.A1_NamHoc_Text && r.A1_NamHoc_Text.toLowerCase().includes(yr));
    const matchQuery = !query || 
      (r.id && r.id.toLowerCase().includes(query)) ||
      (r.A2_Khoa && r.A2_Khoa.toLowerCase().includes(query)) ||
      (r.A2_Nganh && r.A2_Nganh.toLowerCase().includes(query)) ||
      (r.B8_1_Text && r.B8_1_Text.toLowerCase().includes(query));

    return matchFac && matchYr && matchQuery;
  });

  renderResponsesTable(filtered);
}

// Render individual response rows
function renderResponsesTable(list) {
  const tableBody = document.getElementById("responsesTableBody");
  const countDisplay = document.getElementById("filteredCountDisplay");
  if (countDisplay) countDisplay.textContent = `Hiển thị ${list.length} / ${allResponses.length} phiếu`;

  if (!tableBody) return;

  if (list.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 32px; color: #94a3b8;">Không tìm thấy phiếu khảo sát nào phù hợp.</td></tr>`;
    return;
  }

  let html = "";
  list.forEach((r, idx) => {
    // Count activities checked
    let checkedCount = 0;
    if (r.activities) {
      Object.values(r.activities).forEach(v => {
        if (v === 1 || v === "1" || v === true) checkedCount++;
      });
    }

    // Likert mean for this respondent
    let likertSum = 0;
    let likertTotal = 0;
    if (r.frequencies) {
      Object.values(r.frequencies).forEach(v => {
        const val = parseInt(v, 10);
        if (val >= 1 && val <= 5) {
          likertSum += val;
          likertTotal++;
        }
      });
    }
    const meanScore = likertTotal > 0 ? (likertSum / likertTotal).toFixed(1) : "-";

    const dateStr = r.timestamp ? new Date(r.timestamp).toLocaleString("vi-VN", { dateStyle: "short", timeStyle: "short" }) : "N/A";

    html += `
      <tr>
        <td><strong>#${r.id}</strong></td>
        <td><small style="color: #64748b;">${dateStr}</small></td>
        <td>${r.A1_NamHoc_Text || "Năm " + r.A1_NamHoc}</td>
        <td><strong>${r.A2_Khoa}</strong><br><small style="color: #64748b;">${r.A2_Nganh}</small></td>
        <td style="text-align: center;"><span class="badge-num" style="display: inline-flex; width: 22px; height: 22px; font-size: 0.75rem; background: #2563eb;">${checkedCount}</span></td>
        <td style="text-align: center; font-weight: 700; color: #1e3a8a;">${meanScore}</td>
        <td><small>${c9Labels[r.C9_ThoiGian] || r.C9_ThoiGian_Text || r.C9_ThoiGian}</small></td>
        <td style="white-space: nowrap;">
          <button class="btn btn-secondary btn-sm" onclick="viewResponseDetail('${r.id}')" title="Xem chi tiết">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            Xem
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteResponse('${r.id}')" title="Xóa phiếu" style="padding: 4px 8px; margin-left: 4px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;
}

// View details modal of single response
window.viewResponseDetail = function(id) {
  const r = allResponses.find(item => item.id === id);
  if (!r) return;

  document.getElementById("modalRespId").textContent = `#${r.id}`;
  const body = document.getElementById("modalBody");

  // Part B activities list checked
  let activitiesHtml = "";
  if (r.activities) {
    Object.entries(r.activities).forEach(([actId, isChecked]) => {
      if (isChecked === 1 || isChecked === "1" || isChecked === true) {
        const text = activityNames[actId] || actId;
        activitiesHtml += `<li style="margin-bottom: 6px;">✓ <strong>${actId.replace('_', '.')}:</strong> ${text}</li>`;
      }
    });
  }
  if (!activitiesHtml) {
    activitiesHtml = "<li style='color: #94a3b8;'>Không tích chọn hoạt động nào</li>";
  }

  // Part C Likert table
  let likertRows = "";
  Object.entries(likertDimNames).forEach(([code, name]) => {
    const val = r.frequencies ? r.frequencies[code] : (r[code] || 1);
    const text = likertLabels[val] || val;
    likertRows += `
      <tr>
        <td><strong>${code}</strong> - ${name}</td>
        <td style="text-align: center; font-weight: 700; color: #2563eb;">${val}</td>
        <td>${text}</td>
      </tr>
    `;
  });

  body.innerHTML = `
    <div style="margin-bottom: 20px; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0;">
      <h4 style="font-weight: 700; color: #1e3a8a; margin-bottom: 8px;">PHẦN A. THÔNG TIN CHUNG</h4>
      <p><strong>Năm học:</strong> ${r.A1_NamHoc_Text || "Năm " + r.A1_NamHoc}</p>
      <p><strong>Khoa:</strong> ${r.A2_Khoa}</p>
      <p><strong>Ngành:</strong> ${r.A2_Nganh}</p>
      <p><strong>Từng sử dụng Internet tiếp xúc tiếng Anh (A3):</strong> ${r.A3_Internet === "1" || r.A3_Internet === 1 ? "Có" : "Chưa"}</p>
      <p><small style="color: #64748b;">Thời gian gửi: ${r.timestamp ? new Date(r.timestamp).toLocaleString("vi-VN") : "N/A"}</small></p>
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="font-weight: 700; color: #1e3a8a; margin-bottom: 8px;">PHẦN B. CÁC HOẠT ĐỘNG ĐÃ THỰC HIỆN TRONG 4 TUẦN QUA</h4>
      <ul style="list-style-type: none; padding-left: 0; font-size: 0.92rem; background: #f1f5f9; padding: 14px; border-radius: 8px;">
        ${activitiesHtml}
      </ul>
      ${r.B8_1_Text ? `<p style="margin-top: 8px; font-size: 0.92rem;"><strong>Hoạt động B8 khác:</strong> <em>${r.B8_1_Text}</em></p>` : ''}
    </div>

    <div style="margin-bottom: 20px;">
      <h4 style="font-weight: 700; color: #1e3a8a; margin-bottom: 8px;">PHẦN C. MỨC ĐỘ THƯỜNG XUYÊN (THANG ĐO 1-5)</h4>
      <table class="data-table" style="font-size: 0.88rem;">
        <thead>
          <tr>
            <th>Biến nghiên cứu</th>
            <th style="width: 15%; text-align: center;">Điểm số</th>
            <th style="width: 35%;">Mức độ</th>
          </tr>
        </thead>
        <tbody>
          ${likertRows}
        </tbody>
      </table>
      <div style="margin-top: 12px; font-size: 0.92rem;">
        <strong>C9. Thời gian mỗi ngày:</strong> ${c9Labels[r.C9_ThoiGian] || r.C9_ThoiGian_Text || r.C9_ThoiGian}
      </div>
    </div>
  `;

  document.getElementById("detailModal").classList.add("active");
};

function closeModal() {
  document.getElementById("detailModal").classList.remove("active");
}

// Delete single response
window.deleteResponse = async function(id) {
  if (!confirm(`Bạn có chắc muốn xóa phiếu khảo sát #${id}?`)) return;

  try {
    const res = await fetch(`/api/response?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const result = await res.json();
    if (result.success) {
      showAdminToast(`Đã xóa phiếu #${id}`, "success");
      loadData();
    } else {
      showAdminToast("Lỗi: " + result.message, "error");
    }
  } catch (err) {
    showAdminToast("Không thể kết nối đến máy chủ", "error");
  }
};

// Generate 10 realistic mock survey responses for demonstration
async function generateMockData() {
  if (!confirm("Hệ thống sẽ tạo 10 câu trả lời mẫu sát với thực tế sinh viên TDC để bạn kiểm tra thử nghiệm các tính năng thống kê. Bạn có muốn tiếp tục?")) return;

  try {
    const res = await fetch("/api/seed", { method: "POST" });
    const result = await res.json();
    if (result.success) {
      showAdminToast(`Đã tạo thành công ${result.added} phiếu khảo sát mẫu!`, "success");
      loadData();
    } else {
      showAdminToast("Lỗi: " + result.message, "error");
    }
  } catch (err) {
    showAdminToast("Lỗi máy chủ", "error");
  }
}

// Clear all responses
async function clearAllData() {
  if (!confirm("CẢNH BÁO: Bạn có chắc chắn muốn xóa TOÀN BỘ dữ liệu khảo sát hiện có? Thao tác này không thể hoàn tác!")) return;

  try {
    const res = await fetch("/api/clear", { method: "POST" });
    const result = await res.json();
    if (result.success) {
      showAdminToast("Đã xóa sạch toàn bộ dữ liệu!", "success");
      loadData();
    } else {
      showAdminToast("Lỗi: " + result.message, "error");
    }
  } catch (err) {
    showAdminToast("Lỗi máy chủ", "error");
  }
}

// Toast
function showAdminToast(message, type = "info") {
  let toast = document.getElementById("adminToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "adminToast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.className = `toast ${type}`;
  }, 3500);
}
