import db from "../models/index.js";
// file export tất cả models ra 
const userService = require('../services/userService');

let getHomePage = async (req, res) => {
    let users = await userService.getAllUsers();
    return res.render('homepage.ejs', { users: users });
};
// let getHomePage = async (req, res) => {
//     let users = await db.User.findAll();
//     console.log('USERS:', users);
//     return res.render('homepage.ejs', { users: users });
// };

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

// let getCRUD = (req, res) => {
//     return res.render('crud.ejs');
// }

// export là khai báo biến bằng giá trị kia: key - value
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
}