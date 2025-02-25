import express from "express"
// import thư viện express = câu lệnh require('express')

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    // Set up để chỉ lấy được hình ảnh từ folder public thôi - cả bên server hoặc client
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
    /*Sử dụng EJS làm view engine để render HTML động.
    EJS hỗ trợ viết if-else, vòng lặp, và truyền biến từ server vào HTML.
    */
    // set up view engine thông qua ejs (có thể viết if else trong file html)
    // set up chỉ có thể tạo file views trong folder views
}

module.exports = configViewEngine;