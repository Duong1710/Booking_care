const { Sequelize } = require('sequelize');

// Hàm kết nối với Database
const sequelize = new Sequelize('cnpm', 'root', null, {
    host: 'localhost', // Địa chỉ server
    dialect: 'mysql',
    logging: false // + logging = false trong config.json để rút ngắn thông báo hiện dưới terminal thôi
});

//Hàm check kết nối thành công
let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;