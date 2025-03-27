import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();
//express.Router() tạo một bộ định tuyến để quản lý các tuyến đường.
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/crud", homeController.getCRUD);

    router.post("/post-crud", homeController.postCRUD);
    router.get("/get-crud", homeController.displayGetCRUD);
    router.get("/edit-crud", homeController.getEditCRUD);
    router.post("/put-crud", homeController.putCRUD);
    router.get("/delete-crud", homeController.deleteCRUD);

    // Tương tác với frontend
    router.post("/api/login", userController.handleLogin)
    router.get("/api/get-all-users", userController.handleGetAllUsers);

    return app.use("/", router); // Gắn tất cả các route vào ứng dụng Express.
}

module.exports = initWebRoutes; // Xuất ra hàm chưa đường dẫn