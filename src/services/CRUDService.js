

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
    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
    console.log("data from service");
    console.log(data);
    console.log(hashPasswordFromBcrypt);
}
let hashUserPassword = (password) => {
    // Promise để chắc chắn hàm sẽ chạy
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt); // thay đổi, pump password
            resolve(hashPassword); // Trả về password
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
}