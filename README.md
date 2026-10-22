# PWA Luyện từ vựng tiếng Trung

## Triển khai GitHub Pages
1. Giải nén ZIP. Tải **toàn bộ các tệp trong thư mục** lên thư mục gốc của repository (không tải nguyên thư mục cha).
2. GitHub → Settings → Pages → Build and deployment → Deploy from a branch → `main` / `(root)` → Save.
3. Truy cập `https://<username>.github.io/<repository>/`. Chỉ cài ứng dụng sau khi trang đã chạy bằng HTTPS.

## Cài đặt
- **iPhone:** mở trang bằng Safari → Chia sẻ → Thêm vào Màn hình chính. Trình duyệt Chrome trên iOS có thể không cung cấp cùng tùy chọn.
- **Android:** Chrome → menu ⋮ → Cài đặt ứng dụng / Thêm vào màn hình chính.
- **Máy tính:** Chrome hoặc Edge → biểu tượng Cài đặt trên thanh địa chỉ hoặc menu → Cài đặt ứng dụng.

## Dữ liệu và ngoại tuyến
- Dữ liệu từ vựng đã nhập, lựa chọn, điểm luyện chép, thống kê và trạng thái flashcard tiếp tục được lưu bằng **localStorage** của ứng dụng gốc. Không xóa dữ liệu website hoặc dùng chế độ riêng tư nếu muốn giữ tiến độ. Dữ liệu không tự đồng bộ giữa các thiết bị.
- Sau khi tải trang thành công một lần trên HTTPS, giao diện và tính năng luyện chép/flashcard hoạt động offline với dữ liệu đã lưu.
- **Google Sheets cần Internet** để đồng bộ; nhập CSV từ thiết bị vẫn hoạt động offline.
- **Kokoro AI** sử dụng thư viện từ CDN và mô hình từ máy chủ bên ngoài, cần Internet cho lần tải đầu và không được bảo đảm offline. Giọng trình duyệt phụ thuộc vào hệ điều hành, trình duyệt và gói giọng đã cài; có thể không hoạt động offline trên một số máy.

## Cập nhật
1. Sửa `index.html` hoặc các tệp khác.
2. Tăng `CACHE_VERSION` trong `sw.js`, ví dụ từ `chinese-vocab-pwa-v1` lên `chinese-vocab-pwa-v2`.
3. Commit/push lên GitHub Pages. Khi có bản mới, ứng dụng sẽ đề nghị tải lại. Dữ liệu học trong localStorage không bị xóa bởi service worker.
4. Nếu chưa nhận được bản mới, mở ứng dụng khi có Internet và tải lại trang; kiểm tra GitHub Pages đã triển khai xong.

## Kiểm tra đề xuất
- Nhập CSV, đóng/mở lại, kiểm tra dữ liệu và điểm học.
- Luyện chép, đổi chế độ Pinyin, chọn ngẫu nhiên, lật/chấm flashcard, kiểm tra tiến độ sau tải lại.
- Ngắt mạng sau lần truy cập đầu, tải lại và thử luyện chép/flashcard.
- Thử giọng Kokoro và giọng trình duyệt **riêng** khi online/offline.

Lưu ý: Không thể đăng ký Service Worker khi mở `index.html` trực tiếp qua `file://`; hãy dùng GitHub Pages hoặc máy chủ localhost. Các tính năng của bản HTML gốc được giữ nguyên, chưa thay đổi thuật toán luyện tập.
