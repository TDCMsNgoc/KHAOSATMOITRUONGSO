# HƯỚNG DẪN SỬ DỤNG VÀ BẢNG MÃ HÓA BIẾN SPSS
## Đề tài: Khảo sát mức độ đa dạng trong việc tham gia các hoạt động tiếng Anh trên môi trường số (TDC)

---

### 1. CÁCH KHỞI ĐỘNG VÀ CHẠY TRÊN MÁY LOCAL

Hệ thống được thiết kế **tự vận hành 100% bằng Windows PowerShell có sẵn trên máy**, **không cần cài thêm bất kỳ phần mềm hay môi trường nào** (như Node.js, Python, XAMPP...).

#### Cách 1: Chạy nhanh bằng 1-Click (Khuyên dùng)
1. Mở thư mục: `D:\SKKN_NCKH\NCKH\2026-2027\BANG KHAO SAT\`
2. Nhấp đúp chuột vào file: **`Chay_Khao_Sat.bat`**
3. Trình duyệt (Chrome/Edge) sẽ tự động mở trang khảo sát. Giữ nguyên cửa sổ màu đen (Console) trong suốt quá trình khảo sát.

#### Cách 2: Chạy bằng lệnh PowerShell
Mở PowerShell trong thư mục và gõ:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```

---

### 2. CÁC ĐỊA CHỈ TRUY CẬP (URLs)

| Trang | Địa chỉ URL | Mục đích |
|---|---|---|
| **Trang Phiếu khảo sát** | `http://localhost:8080/` | Dành cho sinh viên / người tham gia điền bảng hỏi |
| **Trang Quản trị & Thống kê** | `http://localhost:8080/admin` | Dành cho Thầy/Cô nghiên cứu xem số lượng, thống kê, xem từng phiếu và xuất file |

> **Mẹo chia sẻ trong mạng nội bộ / cùng WiFi**:
> Nếu Thầy/Cô muốn người khác cùng kết nối vào mạng WiFi trường/phòng để điền thử, chỉ cần thay `localhost` bằng địa chỉ IP của máy (Ví dụ: `http://192.168.1.15:8080`).

---

### 3. CÁC TÍNH NĂNG ĐÃ TÍCH HỢP

1. **Thu thập số lượng người tham gia**:
   - Hiển thị trực tiếp $N$ (Tổng số phiếu) theo thời gian thực trên Dashboard.
2. **Xem chi tiết câu trả lời của từng người**:
   - Bảng danh sách phiếu có mã định danh riêng biệt (ví dụ: `TDC_001`, `TDC_002`...).
   - Nút **"Xem"** mở hộp thoại chi tiết toàn bộ câu trả lời của cá nhân đó.
   - Nút **"Xóa"** hỗ trợ loại bỏ các phiếu test thử nghiệm hoặc phiếu không hợp lệ.
3. **Thống kê mô tả trực quan**:
   - **Phần A**: Cơ cấu mẫu theo Năm học, Khoa, Ngành, Tỷ lệ tiếp xúc tiếng Anh số (A3).
   - **Phần B**: Tỷ lệ % và số lượng sinh viên đã tham gia từng hoạt động trong 27 hoạt động số (B1.1 - B8.1), tự động xếp hạng hoạt động phổ biến nhất.
   - **Phần C**: Thống kê chuẩn nghiên cứu (Mean - Điểm trung bình, SD - Độ lệch chuẩn, Tần số phân bố từ 1 đến 5) cho cả 8 nhóm SPSS: `F_VIEW`, `F_MUSIC`, `F_RL`, `F_GAME`, `F_SOCIAL`, `F_CREATIVE`, `F_INTERNAL`, `F_NICHE`.
   - **C9**: Phân bố thời gian trung bình mỗi ngày.
4. **Xuất dữ liệu chuẩn**:
   - Nút **"Xuất Excel/CSV (SPSS Ready)"**: Tải ngay file CSV mã hóa chuẩn UTF-8 có BOM (mở trực tiếp bằng Microsoft Excel không lỗi font tiếng Việt, nhập thẳng vào SPSS mà không cần sửa định dạng).
   - Nút **"Xuất JSON"**: Tải toàn bộ cấu trúc dữ liệu thô.
   - Nút **"Tạo 10 mẫu thử"**: Tự sinh 10 mẫu sinh viên TDC giả định để xem trước toàn bộ báo cáo thống kê ngay lập tức.
   - Nút **"Xóa hết"**: Xóa sạch dữ liệu mẫu trước khi triển khai khảo sát chính thức.

---

### 4. BẢNG MÃ HÓA BIẾN (CODEBOOK) PHỤC VỤ PHÂN TÍCH SPSS

Dữ liệu xuất ra được lưu tại `data/responses.csv` với các tên cột và quy ước mã hóa:

#### A. THÔNG TIN CHUNG
| Tên biến (Column) | Kiểu dữ liệu | Nhãn (Label) | Mã hóa giá trị (Values) |
|---|---|---|---|
| `ID` | String | Mã số phiếu | TDC_001, TDC_002... |
| `Timestamp` | String | Thời gian nộp phiếu | YYYY-MM-DD HH:mm:ss |
| `A1_NamHoc` | Numeric | Năm học thứ mấy | 1 = Năm 1; 2 = Năm 2; 3 = Năm 3; 4 = Khác |
| `A2_Khoa` | String | Tên Khoa | Khoa Kinh tế, Khoa CNTT, v.v. |
| `A2_Nganh` | String | Tên Ngành | Tên 30 ngành đào tạo tại TDC |
| `A3_Internet` | Numeric | Từng tiếp xúc tiếng Anh qua số | 1 = Có; 2 = Chưa |

#### B. CÁC LOẠI HÌNH HOẠT ĐỘNG (Dữ liệu nhị phân: 1 = Đã thực hiện ✓, 0 = Chưa thực hiện)
| Nhóm | Biến SPSS | Nội dung tóm tắt |
|---|---|---|
| **B1. Viewing** | `B1_1` | Xem video, phim, show giải trí tiếng Anh (YouTube, TikTok, Netflix...) |
| | `B1_2` | Xem video hướng dẫn, bài giảng, kiến thức chuyên môn |
| | `B1_3` | Xem livestream nội dung trực tiếp tiếng Anh |
| **B2. Music** | `B2_1` | Nghe nhạc tiếng Anh |
| | `B2_2` | Xem video âm nhạc (MV, biểu diễn, có lời) |
| | `B2_3` | Chủ động tìm, đọc, tra cứu lời bài hát (lyrics) |
| | `B2_4` | Hát theo hoặc hát bài hát tiếng Anh |
| **B3. Reading & Listening** | `B3_1` | Đọc tin tức tiếng Anh (BBC, CNN, Google News...) |
| | `B3_2` | Đọc truyện, tiểu thuyết, blog số bằng tiếng Anh |
| | `B3_3` | Nghe podcast tiếng Anh |
| | `B3_4` | Nghe sách nói (audiobook) tiếng Anh |
| **B4. Gaming** | `B4_1` | Chơi trò chơi có sử dụng tiếng Anh |
| | `B4_2` | Đọc hướng dẫn, nhiệm vụ, thoại trong game |
| | `B4_3` | Giao tiếp với người chơi khác bằng tiếng Anh |
| | `B4_4` | Xem người khác chơi game / livestream tiếng Anh |
| **B5. Social Interaction** | `B5_1` | Nhắn tin/chat tiếng Anh (Messenger, Zalo, WhatsApp, Discord...) |
| | `B5_2` | Bình luận/comment trên mạng xã hội bằng tiếng Anh |
| | `B5_3` | Tham gia group/cộng đồng trực tuyến tiếng Anh |
| | `B5_4` | Tham gia gọi thoại / video call bằng tiếng Anh |
| **B6. Digital Creativity** | `B6_1` | Tạo video hoặc hình ảnh tiếng Anh chia sẻ online |
| | `B6_2` | Tạo nội dung âm thanh/podcast bằng tiếng Anh |
| | `B6_3` | Viết bài, review, status tự tạo bằng tiếng Anh |
| **B7. Internalized** | `B7_1` | Tự nói với bản thân bằng tiếng Anh |
| | `B7_2` | Nghĩ / độc thoại nội tâm trong đầu bằng tiếng Anh |
| | `B7_3` | Tưởng tượng một cuộc hội thoại bằng tiếng Anh |
| | `B7_4` | Tự luyện nói tiếng Anh một mình |
| **B8. Niche / Other** | `B8_1` | Hoạt động tiếng Anh số khác (1: Có, 0: Không) |
| | `B8_1_Text` | Mô tả chi tiết hoạt động khác |

#### C. TẦN SUẤT VÀ MỨC ĐỘ THAM GIA (Thang đo Likert 5 điểm)
**Quy ước điểm**:
- `1` = Không bao giờ
- `2` = Hiếm khi
- `3` = Thỉnh thoảng
- `4` = Thường xuyên
- `5` = Rất thường xuyên

| Tên biến SPSS | Nhóm hoạt động tương ứng | Thang đo |
|---|---|---|
| `F_VIEW` | Tần suất Viewing | Scale (1-5) |
| `F_MUSIC` | Tần suất Music | Scale (1-5) |
| `F_RL` | Tần suất Reading & Listening | Scale (1-5) |
| `F_GAME` | Tần suất Gaming | Scale (1-5) |
| `F_SOCIAL` | Tần suất Social Interaction | Scale (1-5) |
| `F_CREATIVE` | Tần suất Digital Creativity | Scale (1-5) |
| `F_INTERNAL` | Tần suất Internalized | Scale (1-5) |
| `F_NICHE` | Tần suất Niche / Other | Scale (1-5) |
| `C9_ThoiGian` | Thời gian trung bình mỗi ngày: <br>1: Dưới 15 phút <br>2: Từ 15 đến dưới 30 phút <br>3: Từ 30 đến dưới 60 phút <br>4: Từ 60 đến dưới 120 phút <br>5: Từ 120 phút trở lên | Ordinal (1-5) |

---

### 5. HƯỚNG DẪN IMPORT VÀO PHẦN MỀM SPSS

1. Mở phần mềm **IBM SPSS Statistics**.
2. Chọn menu: **File -> Import Data -> CSV Data...**
3. Chọn đường dẫn tới file: `D:\SKKN_NCKH\NCKH\2026-2027\BANG KHAO SAT\data\responses.csv`.
4. Trong hộp thoại Wizard:
   - *First line contains variable names*: chọn **Yes**.
   - *Delimited by*: chọn **Comma**.
   - *Text qualifier*: chọn **Double quote (")**.
5. Nhấn **Finish**. Dữ liệu đã sẵn sàng để chạy Cronbach's Alpha, EFA, Descriptive Statistics, hoặc ANOVA theo Khoa/Năm học!
