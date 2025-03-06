
import db from "../models/index.js";
// file export tất cả models ra 
import CRUDService from "../services/CRUDService.js";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll(); // data đang ở dạng javascript nên có thể console.log ra nhìn được
        return res.render('homepage.ejs', {
            data: JSON.stringify(data) // chuyển thành 1 chuỗi JSON
        });
    } catch (error) {
        console.log(error);
    }
}
// Không cần đường dẫn cho file homepage.ejs vì trong folder config, file viewEngine.js đã config tất cả file view chạy vào folder views

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send("postcrud form server");
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    console.log(userId);
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            user: userData
        });
    }
    else {
        return res.send("Users not found!")
    }
}
// req.body sẽ lấy tất cả cái name, giá trị của ô input trong trang ejs
let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.redirect("/get-crud");
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.redirect("/get-crud");
    }
    else {
        return res.send("Id not available");
    }
}

// export là khai báo biến bằng giá trị kia: key - value
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD
}