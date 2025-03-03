
import db from "../models/index.js";
// file export tất cả models ra 

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

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}