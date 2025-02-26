
let getHomePage = (req, res) => {
    return res.render('homepage.ejs');
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