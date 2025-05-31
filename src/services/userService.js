const { json } = require('sequelize');
const db = require('../models');
const bcrypt = require('bcryptjs');

let createNewUser = async (data) => {
    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        // Tạo user
        let user = await db.User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            address: data.address,
            status: data.status || 'active',
            role: data.role || 'user'
        });
        // Tạo wallet cho user vừa tạo
        await db.Wallet.create({
            userId: user.id,
            balance: Number(data.balance) || 0,
            currency: 'VND',
            status: 'active'
        });
        return { errCode: 0, message: 'Tạo user và ví thành công!' };
    } catch (e) {
        return { errCode: 1, message: 'Lỗi: ' + e.message };
    }
};

let getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', 'fullName', 'phoneNumber', 'gender', 'address', 'status', 'role'],
            include: [{
                model: db.Wallet,
                as: 'wallet',
                attributes: ['balance']
            }],
            raw: true,
            nest: true
        });
        return users;
    } catch (e) {
        return [{ errCode: 1, message: 'Lỗi: ' + e.message }];
    }
};
// let getAllUsers = async () => {
//     try {
//         let users = await db.User.findAll({
//             include: [{ model: db.Wallet, as: 'wallet' }]
//         });
//         // Trả về object thuần
//         return users.map(user => user.toJSON());
//     } catch (e) {
//         return [json({ errCode: 1, message: 'Lỗi: ' + e.message })];
//     }
// };
module.exports = {
    createNewUser,
    getAllUsers
};