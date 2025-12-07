# Project_Book

## Giới thiệu

**Project_Book** là một website quản lý và bán sách trực tuyến, cung cấp các chức năng tìm kiếm, xem chi tiết, quản lý giỏ hàng, đặt hàng và quản trị kho sách qua giao diện Admin.

---

## Tính năng chính

### Trang người dùng

- **Tìm kiếm sách:** Tìm sách qua tên hoặc tác giả ngay trên trang chủ.
- **Danh mục sách:** Phân loại theo các chủ đề (Manga, Văn học, Light Novel, Lịch sử, Tâm lý học, Tâm linh, Đầu tư, Luyện thi, ...).
- **Chi tiết sách:** Xem thông tin chi tiết từng đầu sách, hình ảnh, giá, mô tả, số trang, nhà xuất bản, v.v.
- **Giỏ hàng:** Thêm/xóa sách vào giỏ, thay đổi số lượng, hiển thị tổng tiền.
- **Thanh toán:** Hiển thị giỏ và thao tác thanh toán đơn hàng.
- **Trang bài viết (About):** Giới thiệu, tin tức và liên hệ.
- **Phân trang, lọc và sắp xếp:** (theo yêu cầu, có thể cần hoàn thiện thêm).

### Trang Quản trị (Admin)

- **Xem danh sách kho sách:** Bảng thông tin các sách đang có.
- **Thêm sách mới:** Form nhập thông tin chi tiết (tên, tác giả, giá, NXB, năm xuất bản, hình ảnh, mô tả, ...).
- **Chỉnh sửa/xóa sách:** Thay đổi thông tin sách hiện có hoặc xóa khỏi kho.
- **Tìm kiếm nhanh:** Theo tên sách trong bảng quản trị.

---

## Cấu trúc thư mục tiêu biểu

```
Project_Book/
├── admin/              # Giao diện quản trị (Admin)
│   ├── admin.html      # Trang admin
│   ├── admin.css
│   ├── app.js          # Xử lý logic CRUD cho sách qua API
├── js/
│   ├── script.js       # Trang chủ: lấy danh sách, xử lý tìm kiếm
│   ├── detail.js       # Trang chi tiết: lấy chi tiết, thêm vào giỏ
│   ├── cart.js         # Trang giỏ hàng: xử lý hiển thị/xóa/số lượng
├── index.html          # Trang chủ
├── about.html          # Trang bài viết/Giới thiệu
├── detail.html         # Trang chi tiết sách
├── cart.html           # Trang giỏ hàng
├── login.html          # Đăng nhập (nếu sử dụng)
├── css/
│   ├── about.css
│   ├── style.css       # (Nếu có)
├── các yêu cầu.txt     # Danh sách các yêu cầu chức năng
└── README.md
```

## Hướng dẫn sử dụng

### 1. Chạy thử local

1. Clone repository:
   ```bash
   git clone https://github.com/bellion13/Project_Book.git
   cd Project_Book
   ```

2. Tất cả giao diện chạy trực tiếp qua file `.html` (dùng LiveServer, XAMPP hoặc mở trực tiếp trên trình duyệt).

3. **Yêu cầu kết nối internet** để sử dụng API mẫu từ MockAPI .

4. Truy cập các file:
   - `index.html`: Trang chủ danh sách sách.
   - `detail.html`: Trang chi tiết sản phẩm sách.
   - `cart.html`: Quản lý giỏ hàng.
   - `about.html`: Trang giới thiệu.
   - `admin/admin.html`: Quản trị (với CRUD - Create/Read/Update/Delete cho sách).

### 2. Các thao tác chính

#### Trang người dùng:

- **Tìm kiếm sách:** Nhập tên/tác giả vào ô tìm kiếm.
- **Thêm vào giỏ:** Vào `detail.html`, nhấn "Thêm vào giỏ".
- **Sửa/xóa số lượng:** Trong `cart.html`, tăng/giảm/xóa sản phẩm.
- **Thanh toán:** Xem giỏ và thực hiện các thao tác đặt hàng cơ bản.

#### Trang Admin:

- **Thêm sách mới:** Nhấn "Thêm" → nhập đầy đủ thông tin → xác nhận.
- **Chỉnh sửa sách:** Nhấn nút chỉnh sửa tương ứng từng dòng.
- **Xóa sách:** Nhấn nút xóa tại dòng sản phẩm.

---

## Công nghệ sử dụng

- **HTML/CSS/JavaScript (Thuần)**
- **Bootstrap, FontAwesome** (CDN)
- **MockAPI** để lưu trữ dữ liệu (có thể thay bằng server thật).
- **Quản trị CRUD qua giao diện Admin**

---

## Lưu ý & Phát triển thêm

- Hệ thống sử dụng dữ liệu demo từ MockAPI, chưa tích hợp đăng nhập/xác thực thật sự.
- Có thể mở rộng hệ thống API, phân quyền, thêm chức năng nâng cao (lọc, phân trang, sắp xếp).
- Giao diện mobile chưa tối ưu.
- Nếu muốn deploy lên hosting thật, cần cài đặt backend, database và sửa lại các API endpoint.

---

## Liên hệ

Mọi góp ý, thắc mắc xin liên hệ qua trang `about.html` hoặc [Github Issues](https://github.com/bellion13/Project_Book/issues).

---

**© 2023 Ber / bellion13 / Project_Book**
