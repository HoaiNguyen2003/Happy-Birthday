# Hướng Dẫn Triển Khai & Cấu Hình

## Nền tảng: Vercel (Tự động triển khai qua GitHub)
## Kho lưu trữ: https://github.com/HoaiNguyen2003/Happy-Birthday
## Tên miền tùy chỉnh: Tùy chọn (Cấu hình qua bảng điều khiển Vercel)

Trang web tĩnh này được cấu hình để tự động triển khai lên Vercel mỗi khi bạn đẩy (push) thay đổi lên kho lưu trữ GitHub của mình.

### Cấu Hình Hiện Tại Của Dự Án
Dự án đã được thiết lập sẵn với các thông tin sau:
1. **Ngôn ngữ**: Đã được bản địa hóa hoàn toàn sang **tiếng Việt** (bao gồm toàn bộ giao diện, câu hỏi gợi ý và thông điệp chúc mừng).
2. **Tên người nhận mặc định**: Được thiết lập là **Hương Vy**.
3. **Mật mã mở khóa (Passcode)**: Được thiết lập là **23072003** (ngày sinh của Hương Vy).

---

### Cài Đặt Ban Đầu (Thực hiện một lần)
1. Truy cập [Vercel](https://vercel.com) và đăng ký hoặc đăng nhập bằng tài khoản **GitHub** của bạn.
2. Sau khi đăng nhập, nhấp vào **Add New...** -> **Project** trên bảng điều khiển Vercel.
3. Tìm kho lưu trữ **Happy-Birthday** trong danh sách các kho lưu trữ GitHub của bạn và nhấp **Import**.
4. Tại màn hình cấu hình:
   - **Framework Preset**: Giữ nguyên là **Other** (hệ thống sẽ tự động phát hiện dự án web tĩnh).
   - **Root Directory**: Giữ nguyên là `./` (hoặc để trống) vì tệp `index.html` nằm ở thư mục gốc.
   - **Build and Output Settings**: Giữ nguyên mặc định.
5. Nhấp **Deploy**. Vercel sẽ tự động xây dựng và triển khai trang web trong khoảng 10-20 giây và cấp cho bạn một đường dẫn (URL) miễn phí có dạng `https://happy-birthday-xxx.vercel.app`.

---

### Triển Khai Thay Đổi (Cập nhật trong tương lai)
Mỗi khi bạn thực hiện bất kỳ thay đổi nào đối với mã nguồn (chẳng hạn như chỉnh sửa nội dung thư, hình ảnh hoặc nhạc nền):
1. Mở dòng lệnh (Terminal) tại thư mục dự án và chạy các lệnh sau để đẩy thay đổi lên GitHub:
   ```bash
   git add .
   git commit -m "Cập nhật nội dung chúc mừng sinh nhật"
   git push origin main
   ```
2. Ngay sau khi mã nguồn được đẩy thành công lên GitHub, Vercel sẽ tự động kích hoạt quá trình triển khai mới. Trang web trực tuyến của bạn sẽ được cập nhật tự động chỉ sau khoảng 15 giây!
