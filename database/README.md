# UDT Backend test

## Lựa chọn Database


Lựa chọn **MongoDB** làm cơ sở dữ liệu để triển khai hệ thống

Điểm mạnh của MongoDB:
- Có cú pháp khá giống ngôn ngữ Javascript và biểu diễn data dưới dạng JSON do đó khá dễ làm quen.
- Setup đơn giản và nhanh chóng hơn các loại RDBMS vì không chứa nhiều ràng buộc
- Có độ phản hồi cực cao vì là một document-stored database => Tính Availability cao.
- Có tính flexibility cao vì nó là schemaless database.
- Có cơ chế sharding tách dữ liệu ra nhiều cluster để phân tán độ chịu tải trên từng database server.
- có cơ chế replication để truy vấn được từ mọi địa điểm và cũng hộ trợ chịu tải cho database server.
=> Phù hợp đối với những ứng dụng có lượng dữ liệu lớn

Điểm yếu của MongoDB:
- Tốn nhiều dung lượng lưu trữ vì tính availability cao, điển hình là cơ chế replication.
- Tính consistency thấp vì không có ràng buộc và quan hệ giữa các document.
