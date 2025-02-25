import express from "express"; //Framework giúp xây dựng server web.
import bodyParser from "body-parser"; // Middleware giúp xử lý dữ liệu từ request (JSON, form-data)
import viewEngine from "./config/viewEngine"; // Cấu hình template engine để render HTML động
import initWebRoutes from './route/web'; // File chứa định nghĩa các tuyến đường (routes)
import dotenv from "dotenv";
dotenv.config();// Sử dụng được câu lệnh process.env.PORT

let app = express(); // Khởi tạo một ứng dụng Express.

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
/*bodyParser.json(): Cho phép server đọc dữ liệu JSON từ req.body.
bodyParser.urlencoded({ extended: true }): Cho phép xử lý dữ liệu form-data (các form HTML gửi về).
*/
viewEngine(app);
/*Gọi hàm viewEngine(app) để:
Thiết lập EJS làm view engine.
Chỉ định thư mục chứa file EJS.
Cấu hình thư mục chứa file tĩnh.
*/
initWebRoutes(app);
// Gọi initWebRoutes(app) để đăng ký các routes (ví dụ: /, /about).
let port = process.env.PORT || 6969;
//Port === undefined => port = 6969
/*Lấy cổng từ file .env (process.env.PORT).
Nếu không có, dùng mặc định là 6969.*/
app.listen(port, () => {
    //callback
    console.log(`Backend Nodejs is running on port: ${port}`);
    console.log("hello");
});