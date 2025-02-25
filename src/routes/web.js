import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();
//express.Router() tạo một bộ định tuyến để quản lý các tuyến đường.
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);

    return app.use("/", router); // Gắn tất cả các route vào ứng dụng Express.
}

module.exports = initWebRoutes; // Xuất ra hàm chưa đường dẫn