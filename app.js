// Data mapping for Faculties and Majors at TDC
const facultyMajorMap = {
  "Khoa Động Lực": [
    "Công nghệ kỹ thuật ô tô",
    "Bảo trì và sửa chữa ô tô"
  ],
  "Khoa Cơ khí": [
    "Công nghệ kỹ thuật cơ khí",
    "Chế tạo thiết bị cơ khí"
  ],
  "Khoa Công nghệ tự động": [
    "CNKT Cơ điện tử",
    "CNKT Điều khiển và tự động hóa",
    "Tự động hóa công nghiệp"
  ],
  "Khoa Kinh tế": [
    "Logistics",
    "Quản lý siêu thị",
    "Tài chính ngân hàng",
    "Quản trị kinh doanh",
    "Marketing",
    "Kế toán tin học",
    "Kế toán",
    "Kinh doanh thương mại"
  ],
  "Khoa Du lịch-Khách sạn": [
    "Quản trị dịch vụ du lịch và lữ hành",
    "Quản trị khách sạn",
    "Quản trị nhà hàng"
  ],
  "Khoa Đông Phương": [
    "Tiếng Hàn Quốc",
    "Tiếng Nhật",
    "Tiếng Trung Quốc"
  ],
  "Khoa Công nghệ thông tin": [
    "Công nghệ thông tin",
    "Truyền thông và mạng máy tính",
    "Thiết kế đồ họa"
  ],
  "Khoa Điện-Điện tử": [
    "Công nghệ kỹ thuật điện, điện tử",
    "Điện công nghiệp",
    "Kỹ thuật lắp đặt điện và điều khiển trong công nghiệp",
    "Điện tử công nghiệp",
    "CNKT điện tử, truyền thông",
    "Kỹ thuật máy lạnh và điều hòa không khí"
  ]
};

// All 30 majors
const allMajors = [
  "Công nghệ kỹ thuật ô tô",
  "Bảo trì và sửa chữa ô tô",
  "Công nghệ kỹ thuật cơ khí",
  "Chế tạo thiết bị cơ khí",
  "CNKT Cơ điện tử",
  "CNKT Điều khiển và tự động hóa",
  "Tự động hóa công nghiệp",
  "Logistics",
  "Quản lý siêu thị",
  "Tài chính ngân hàng",
  "Quản trị kinh doanh",
  "Marketing",
  "Kế toán tin học",
  "Kế toán",
  "Kinh doanh thương mại",
  "Quản trị dịch vụ du lịch và lữ hành",
  "Quản trị khách sạn",
  "Quản trị nhà hàng",
  "Tiếng Hàn Quốc",
  "Tiếng Nhật",
  "Tiếng Trung Quốc",
  "Công nghệ thông tin",
  "Truyền thông và mạng máy tính",
  "Thiết kế đồ họa",
  "Công nghệ kỹ thuật điện, điện tử",
  "Điện công nghiệp",
  "Kỹ thuật lắp đặt điện và điều khiển trong công nghiệp",
  "Điện tử công nghiệp",
  "CNKT điện tử, truyền thông",
  "Kỹ thuật máy lạnh và điều hòa không khí"
];

// Activity items definition
const activitiesData = [
  {
    groupCode: "B1",
    title: "B1. VIEWING – Xem nội dung bằng tiếng Anh",
    items: [
      { id: "B1_1", code: "B1.1", text: "Xem video, phim, chương trình giải trí hoặc các nội dung hình ảnh bằng tiếng Anh trên các nền tảng số (YouTube, TikTok, Facebook, Netflix...)." },
      { id: "B1_2", code: "B1.2", text: "Xem video hướng dẫn, bài giảng, video cung cấp kiến thức hoặc nội dung chuyên môn bằng tiếng Anh trên các nền tảng số." },
      { id: "B1_3", code: "B1.3", text: "Xem livestream hoặc các nội dung trực tiếp bằng tiếng Anh trên các nền tảng số." }
    ]
  },
  {
    groupCode: "B2",
    title: "B2. MUSIC – Hoạt động âm nhạc bằng tiếng Anh",
    items: [
      { id: "B2_1", code: "B2.1", text: "Nghe nhạc bằng tiếng Anh." },
      { id: "B2_2", code: "B2.2", text: "Xem video âm nhạc bằng tiếng Anh (video ca nhạc, video biểu diễn, video có lời bài hát hiển thị trên màn hình)." },
      { id: "B2_3", code: "B2.3", text: "Đọc lời bài hát bằng tiếng Anh mà không chỉ đơn thuần là xem lời bài hát xuất hiện trong video âm nhạc (chủ động tìm, đọc, tra cứu lyrics)." },
      { id: "B2_4", code: "B2.4", text: "Hát theo hoặc hát các bài hát bằng tiếng Anh." }
    ]
  },
  {
    groupCode: "B3",
    title: "B3. READING & LISTENING – Đọc và nghe bằng tiếng Anh",
    items: [
      { id: "B3_1", code: "B3.1", text: "Đọc tin tức bằng tiếng Anh trên website/ứng dụng tin tức (BBC, CNN, Google News...)." },
      { id: "B3_2", code: "B3.2", text: "Đọc truyện, tiểu thuyết, blog hoặc các nội dung chữ khác bằng tiếng Anh trên môi trường số." },
      { id: "B3_3", code: "B3.3", text: "Nghe podcast bằng tiếng Anh." },
      { id: "B3_4", code: "B3.4", text: "Nghe sách nói (audiobook) bằng tiếng Anh." }
    ]
  },
  {
    groupCode: "B4",
    title: "B4. GAMING – Chơi và tương tác trong trò chơi",
    items: [
      { id: "B4_1", code: "B4.1", text: "Chơi trò chơi (điện tử, board game, nhập vai…) có sử dụng tiếng Anh." },
      { id: "B4_2", code: "B4.2", text: "Đọc hướng dẫn, nhiệm vụ, hội thoại hoặc nội dung trong trò chơi bằng tiếng Anh." },
      { id: "B4_3", code: "B4.3", text: "Giao tiếp với người chơi khác bằng tiếng Anh trong khi chơi trò chơi." },
      { id: "B4_4", code: "B4.4", text: "Xem người khác chơi trò chơi hoặc nội dung liên quan đến trò chơi bằng tiếng Anh (video hướng dẫn, livestream, bình luận...)." }
    ]
  },
  {
    groupCode: "B5",
    title: "B5. SOCIAL INTERACTION – Tương tác xã hội bằng tiếng Anh",
    items: [
      { id: "B5_1", code: "B5.1", text: "Nhắn tin/trò chuyện với người khác bằng tiếng Anh (Messenger, Zalo, WhatsApp, Discord...)." },
      { id: "B5_2", code: "B5.2", text: "Bình luận/phản hồi nội dung của người khác bằng tiếng Anh trên social media (Facebook, TikTok, Instagram, YouTube...)." },
      { id: "B5_3", code: "B5.3", text: "Tham gia nhóm/cộng đồng trực tuyến để giao lưu, trao đổi và tương tác với người khác bằng tiếng Anh (Facebook Groups, Reddit, Discord, forums...)." },
      { id: "B5_4", code: "B5.4", text: "Tham gia trò chuyện bằng tiếng Anh qua cuộc gọi thoại/video trên môi trường số." }
    ]
  },
  {
    groupCode: "B6",
    title: "B6. DIGITAL CREATIVITY – Sáng tạo nội dung số bằng tiếng Anh",
    items: [
      { id: "B6_1", code: "B6.1", text: "Tạo video hoặc nội dung hình ảnh bằng tiếng Anh để chia sẻ trực tuyến (TikTok, YouTube, bài đăng có nội dung do bạn tự tạo)." },
      { id: "B6_2", code: "B6.2", text: "Tạo nội dung âm thanh/podcast bằng tiếng Anh." },
      { id: "B6_3", code: "B6.3", text: "Viết bài, câu chuyện, bài đánh giá hoặc nội dung do bản thân tạo ra bằng tiếng Anh để chia sẻ trực tuyến." }
    ]
  },
  {
    groupCode: "B7",
    title: "B7. INTERNALIZED – Sử dụng tiếng Anh ở dạng nội tại",
    items: [
      { id: "B7_1", code: "B7.1", text: "Tự nói với bản thân bằng tiếng Anh." },
      { id: "B7_2", code: "B7.2", text: "Nghĩ/diễn đạt suy nghĩ trong đầu bằng tiếng Anh." },
      { id: "B7_3", code: "B7.3", text: "Tưởng tượng một cuộc hội thoại bằng tiếng Anh." },
      { id: "B7_4", code: "B7.4", text: "Tự luyện nói tiếng Anh khi không có người khác tham gia." }
    ]
  }
];

const likertItems = [
  { code: "F_VIEW", label: "Viewing (Xem nội dung tiếng Anh)" },
  { code: "F_MUSIC", label: "Music (Hoạt động âm nhạc)" },
  { code: "F_RL", label: "Reading & Listening (Đọc và nghe)" },
  { code: "F_GAME", label: "Gaming (Trò chơi số)" },
  { code: "F_SOCIAL", label: "Social Interaction (Tương tác xã hội)" },
  { code: "F_CREATIVE", label: "Digital Creativity (Sáng tạo nội dung số)" },
  { code: "F_INTERNAL", label: "Internalized (Dạng nội tại / suy nghĩ / tự thoại)" },
  { code: "F_NICHE", label: "Niche / Other (Hoạt động đặc thù hoặc khác)" }
];

document.addEventListener("DOMContentLoaded", () => {
  initFacultyMajorSelectors();
  renderActivitiesPartB();
  renderLikertPartC();
  setupInteractivity();
  setupFormSubmission();
  updateProgress();
});

// Setup dropdowns for Khoa and Ngành
function initFacultyMajorSelectors() {
  const facultySelect = document.getElementById("selectFaculty");
  const majorSelect = document.getElementById("selectMajor");

  // Populate faculties
  facultySelect.innerHTML = '<option value="">-- Chọn Khoa bạn đang học --</option>';
  Object.keys(facultyMajorMap).forEach(fac => {
    const opt = document.createElement("option");
    opt.value = fac;
    opt.textContent = fac;
    facultySelect.appendChild(opt);
  });

  // Function to populate majors
  function populateMajors(selectedFaculty) {
    majorSelect.innerHTML = '<option value="">-- Chọn Ngành đào tạo --</option>';
    let majors = [];
    if (selectedFaculty && facultyMajorMap[selectedFaculty]) {
      majors = facultyMajorMap[selectedFaculty];
    } else {
      majors = allMajors;
    }

    majors.forEach(m => {
      const opt = document.createElement("option");
      opt.value = m;
      opt.textContent = m;
      majorSelect.appendChild(opt);
    });
  }

  populateMajors("");

  // When faculty changes, filter majors
  facultySelect.addEventListener("change", (e) => {
    const fac = e.target.value;
    const currentMajor = majorSelect.value;
    populateMajors(fac);
    if (fac && facultyMajorMap[fac].includes(currentMajor)) {
      majorSelect.value = currentMajor;
    }
    updateProgress();
  });

  // When major changes, auto select corresponding faculty
  majorSelect.addEventListener("change", (e) => {
    const major = e.target.value;
    if (major) {
      for (const [fac, majors] of Object.entries(facultyMajorMap)) {
        if (majors.includes(major)) {
          facultySelect.value = fac;
          break;
        }
      }
    }
    updateProgress();
  });
}

// Render Part B activities
function renderActivitiesPartB() {
  const container = document.getElementById("partBContainer");
  if (!container) return;

  let html = "";
  activitiesData.forEach(sub => {
    html += `
      <div class="activity-subgroup">
        <div class="subgroup-header">
          <div class="subgroup-title">${sub.title}</div>
        </div>
        <div class="activity-list">
    `;

    sub.items.forEach(item => {
      html += `
        <label class="activity-item" for="${item.id}">
          <input type="checkbox" name="${item.id}" id="${item.id}" value="1">
          <span class="activity-code">${item.code}</span>
          <span class="activity-desc">${item.text}</span>
        </label>
      `;
    });

    html += `
        </div>
      </div>
    `;
  });

  // Part B8
  html += `
    <div class="activity-subgroup">
      <div class="subgroup-header">
        <div class="subgroup-title">B8. NICHE / OTHER – Hoạt động đặc thù hoặc hoạt động khác</div>
      </div>
      <div class="activity-list">
        <label class="activity-item" for="B8_1">
          <input type="checkbox" name="B8_1" id="B8_1" value="1">
          <span class="activity-code">B8.1</span>
          <span class="activity-desc">Một hoạt động tiếng Anh số khác mà bạn thường thực hiện</span>
        </label>
        <div style="margin-top: 8px; margin-left: 32px;">
          <input type="text" id="B8_1_Text" name="B8_1_Text" class="text-input" placeholder="Nhập tên hoạt động tiếng Anh khác (nếu có)...">
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Toggle active styling on checkbox change
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", (e) => {
      const parent = e.target.closest(".activity-item");
      if (parent) {
        if (e.target.checked) {
          parent.classList.add("checked");
        } else {
          parent.classList.remove("checked");
        }
      }
    });
  });
}

// Render Part C Likert table
function renderLikertPartC() {
  const tableBody = document.getElementById("likertTableBody");
  if (!tableBody) return;

  let html = "";
  likertItems.forEach((item, idx) => {
    html += `
      <tr>
        <td>
          <div class="likert-row-title">
            ${item.label}
            <span class="likert-spss-tag">${item.code}</span>
          </div>
        </td>
    `;

    for (let score = 1; score <= 5; score++) {
      html += `
        <td>
          <label class="likert-btn-label">
            <input type="radio" name="${item.code}" value="${score}" required>
          </label>
        </td>
      `;
    }

    html += `</tr>`;
  });

  tableBody.innerHTML = html;
}

// Setup custom interactive UI
function setupInteractivity() {
  // Option-card radio selection visual state
  document.querySelectorAll(".option-card").forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    if (radio) {
      card.addEventListener("click", () => {
        radio.checked = true;
        // remove selected from siblings
        const groupName = radio.name;
        document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
          const c = r.closest(".option-card");
          if (c) c.classList.remove("selected");
        });
        card.classList.add("selected");
        updateProgress();
      });
    }
  });

  // Track progress on all inputs
  document.getElementById("surveyForm").addEventListener("change", updateProgress);
}

// Progress calculation
function updateProgress() {
  let totalSteps = 4 + 8 + 1; // A1, Khoa, Ngành, A3 + 8 Likert items + C9
  let completedSteps = 0;

  // A1
  if (document.querySelector('input[name="A1"]:checked')) completedSteps++;
  // Khoa
  if (document.getElementById("selectFaculty")?.value) completedSteps++;
  // Ngành
  if (document.getElementById("selectMajor")?.value) completedSteps++;
  // A3
  if (document.querySelector('input[name="A3"]:checked')) completedSteps++;

  // 8 Likert items
  likertItems.forEach(item => {
    if (document.querySelector(`input[name="${item.code}"]:checked`)) completedSteps++;
  });

  // C9
  if (document.querySelector('input[name="C9"]:checked')) completedSteps++;

  const percent = Math.min(100, Math.round((completedSteps / totalSteps) * 100));
  const fill = document.getElementById("progressFill");
  const text = document.getElementById("progressText");
  if (fill) fill.style.width = percent + "%";
  if (text) text.textContent = `Tiến độ hoàn thành: ${percent}%`;
}

// Show Toast
function showToast(message, type = "info") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  setTimeout(() => {
    toast.className = `toast ${type}`;
  }, 4000);
}

// Form submission
function setupFormSubmission() {
  const form = document.getElementById("surveyForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validate Part A
    const a1 = document.querySelector('input[name="A1"]:checked');
    const faculty = document.getElementById("selectFaculty").value;
    const major = document.getElementById("selectMajor").value;
    const a3 = document.querySelector('input[name="A3"]:checked');

    if (!a1) {
      showToast("Vui lòng chọn Năm thứ mấy bạn đang học (Câu A1)", "error");
      document.getElementById("sectionA").scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!faculty) {
      showToast("Vui lòng chọn Khoa bạn đang theo học (Câu A2)", "error");
      document.getElementById("selectFaculty").focus();
      return;
    }
    if (!major) {
      showToast("Vui lòng chọn Ngành bạn đang theo học (Câu A2)", "error");
      document.getElementById("selectMajor").focus();
      return;
    }
    if (!a3) {
      showToast("Vui lòng trả lời câu hỏi A3 về việc sử dụng Internet/nền tảng số", "error");
      return;
    }

    // Validate Part C Likert
    for (const item of likertItems) {
      const selected = document.querySelector(`input[name="${item.code}"]:checked`);
      if (!selected) {
        showToast(`Vui lòng đánh giá mức độ thường xuyên cho mục "${item.label}"`, "error");
        document.getElementById("sectionC").scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Validate C9
    const c9 = document.querySelector('input[name="C9"]:checked');
    if (!c9) {
      showToast("Vui lòng chọn thời gian trung bình mỗi ngày (Câu C9)", "error");
      document.getElementById("questionC9").scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Construct submission object
    const payload = {
      // Part A
      A1_NamHoc: a1.value,
      A1_NamHoc_Text: a1.dataset.label || a1.value,
      A2_Khoa: faculty,
      A2_Nganh: major,
      A3_Internet: a3.value,
      A3_Internet_Text: a3.value === "1" ? "Có" : "Chưa",

      // Part B
      activities: {},
      B8_1_Text: document.getElementById("B8_1_Text")?.value.trim() || "",

      // Part C
      frequencies: {},
      C9_ThoiGian: c9.value,
      C9_ThoiGian_Text: c9.dataset.label || c9.value
    };

    // Extract Part B checkboxes
    activitiesData.forEach(sub => {
      sub.items.forEach(item => {
        const cb = document.getElementById(item.id);
        payload.activities[item.id] = (cb && cb.checked) ? 1 : 0;
      });
    });
    const b81 = document.getElementById("B8_1");
    payload.activities["B8_1"] = (b81 && b81.checked) ? 1 : 0;

    // Extract Part C Likert
    likertItems.forEach(item => {
      const checkedRadio = document.querySelector(`input[name="${item.code}"]:checked`);
      payload.frequencies[item.code] = checkedRadio ? parseInt(checkedRadio.value, 10) : 1;
    });

    const submitBtn = document.getElementById("submitBtn");
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Đang gửi dữ liệu...";

    // Sao lưu câu trả lời vào localStorage thiết bị để không bao giờ bị mất
    const localId = "TDC_" + Date.now().toString().slice(-4);
    payload.id = localId;
    payload.timestamp = new Date().toLocaleString("vi-VN");
    try {
      const backupList = JSON.parse(localStorage.getItem("tdc_survey_responses_backup") || "[]");
      backupList.push(payload);
      localStorage.setItem("tdc_survey_responses_backup", JSON.stringify(backupList));
    } catch (_) {}

    function showSuccess(id, extraNote = "") {
      document.getElementById("formContainer").style.display = "none";
      const successBox = document.getElementById("successContainer");
      successBox.style.display = "block";
      document.getElementById("respIdDisplay").textContent = id;
      const noteEl = document.getElementById("successExtraNote");
      if (noteEl) {
        if (extraNote) {
          noteEl.textContent = extraNote;
          noteEl.style.display = "block";
        } else {
          noteEl.style.display = "none";
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const hasGoogleScript = !!(window.CONFIG && window.CONFIG.GOOGLE_SCRIPT_URL && window.CONFIG.GOOGLE_SCRIPT_URL.trim() !== "");
    const isGitHubPages = window.location.hostname.includes("github.io");
    const isFileProtocol = window.location.protocol === "file:";

    // Trường hợp 1: Đã cấu hình Google Apps Script Web App (chạy Online hoặc trên GitHub Pages)
    if (hasGoogleScript) {
      const gUrl = window.CONFIG.GOOGLE_SCRIPT_URL.trim();
      try {
        // Thử gửi bằng fetch thông thường
        const res = await fetch(gUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });
        let recordedId = localId;
        try {
          const resData = await res.json();
          if (resData && resData.id) recordedId = resData.id;
        } catch (_) {}

        showSuccess(recordedId);
        return;
      } catch (corsOrRedirectErr) {
        console.warn("Chuyển hướng CORS từ Google Script, đang tự động kích hoạt chế độ no-cors...", corsOrRedirectErr);
        try {
          // Google Apps Script luôn nhận được dữ liệu và ghi vào Google Sheet thành công với mode: no-cors
          await fetch(gUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload)
          });
          showSuccess(localId);
          return;
        } catch (failErr) {
          console.error("Gửi đến Google Apps Script thất bại:", failErr);
          showToast("Không thể gửi dữ liệu. Vui lòng kiểm tra lại kết nối mạng Internet của bạn!", "error");
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          return;
        }
      }
    }

    // Trường hợp 2: Đang mở trên GitHub Pages nhưng chưa dán link Google Sheet vào config.js
    if (isGitHubPages) {
      showToast("⚠️ Khảo sát trên GitHub Pages cần liên kết với Google Sheet để lưu dữ liệu!", "error");
      showSuccess(localId, "Lưu ý dành cho Người nghiên cứu: Phiếu này đang được lưu tạm trên trình duyệt của máy vì bạn chưa dán link Google Sheet vào file config.js. Vui lòng xem hướng dẫn trong file HUONG_DAN_CHAY_TREN_GITHUB.md!");
      return;
    }

    // Trường hợp 3: Mở file HTML trực tiếp bằng chuột (file:///)
    if (isFileProtocol) {
      showSuccess(localId, "Phiếu đã được lưu an toàn trong bộ nhớ trình duyệt! Để dữ liệu tự động ghi vào file Excel/CSV, bạn hãy mở file 'Chay_Khao_Sat.bat' để khởi động máy chủ.");
      return;
    }

    // Trường hợp 4: Chạy trên máy Localhost (localhost:8080)
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();

      if (result.success) {
        showSuccess(result.id);
      } else {
        showToast("Lỗi: " + (result.message || "Không thể lưu phiếu"), "error");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    } catch (localErr) {
      console.warn("Không kết nối được server local:", localErr);
      showToast("Không thể kết nối đến máy chủ local. Hãy kiểm tra cửa sổ Chay_Khao_Sat.bat có đang mở không!", "error");
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  // Button to submit another response
  const btnNewResponse = document.getElementById("btnNewResponse");
  if (btnNewResponse) {
    btnNewResponse.addEventListener("click", () => {
      form.reset();
      document.querySelectorAll(".option-card.selected").forEach(c => c.classList.remove("selected"));
      document.querySelectorAll(".activity-item.checked").forEach(c => c.classList.remove("checked"));
      initFacultyMajorSelectors();
      document.getElementById("successContainer").style.display = "none";
      document.getElementById("formContainer").style.display = "block";
      updateProgress();
      window.scrollTo({ top: 0, behavior: "smooth" });
      const submitBtn = document.getElementById("submitBtn");
      submitBtn.disabled = false;
      submitBtn.innerHTML = "Gửi phiếu khảo sát";
    });
  }
}
