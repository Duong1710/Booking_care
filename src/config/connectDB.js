const { Sequelize } = require('sequelize');

// Hàm kết nối với Database
const sequelize = new Sequelize('hoidanit', 'root', null, {
    host: 'localhost', // Địa chỉ server
    dialect: 'mysql'
});

//Hàm check kết nối thành công
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;