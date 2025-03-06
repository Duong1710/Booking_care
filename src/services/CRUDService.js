

import bcrypt from "bcryptjs"; // import thư viện
import db from "../models/index.js";
const salt = bcrypt.genSaltSync(10); // câu lệnh để thay đổi password

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })

            resolve('Create new user succeed!');

        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    // Promise để chắc chắn hàm sẽ chạy: hàm này sẽ bảo nodejs rằng m phải chạy tao xog rồi mới chạy cái khác
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt); // thay đổi, pump password
            resolve(hashPassword); // Trả về password
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true, // Hiển thị dữ liệu duy nhất thôi, không bị lan man dữ liệu
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            });
            if (user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save(); // lưu lại trong database - đây là cú pháp update của sequelize
                resolve();
            }
            else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve(); // return;
        } catch (error) {
            reject(error);
        }
    })
}



module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}