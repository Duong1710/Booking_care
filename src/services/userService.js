
import db from "../models/index.js";
import bcrypt from "bcryptjs"; // import thư viện
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {
                // user existed
                let user = await db.User.findOne({
                    where: { email: email }, // email trong db bằng email truyền vào 
                    attributes: ['email', 'roleId', 'password'],
                    /*
                    mục đích là in ra 2 thuộc tính email và roleId nhưng cũng phải lấy cả password nhằm mục 
                    đích lát phải check password ở dưới. Sau đó có dòng delete user.password nhằm tránh lộ password ra ngoài
                     */
                    raw: true
                });
                if (user) { // user có tồn tại
                    // check password
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = `Okeee`;
                        console.log(user);
                        delete user.password; // Để không lộ password ra - yêu cầu phải để raw: true để trả về user là 1 object -> lúc ấy mới delete kiểu object được
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = `Wrong password`;
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = "User is not exist"
                }

            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email is not exist`
            }
            resolve(userData)
        } catch (error) {
            reject(error);
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail } // email trong db bằng email truyền vào thì tìm được
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'abc';
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                    // raw: true 
                    // để hiển thị thông tin chính khi console.log(users) trong file userControler.getAllUsers thôi nhưng sau này không cần vì để config trong file config.json query trả về raw: true
                })
            }
            if (userId && userId !== "ALL") {
                users = await db.User.findOne({
                    where: { id: userId }, // idl trong db bằng id truyền vào thì tìm được
                    attributes: {
                        exclude: ['password']
                    }
                    // raw: true 
                    // để hiển thị thông tin chính khi console.log(users) trong file userControler.getAllUsers thôi nhưng sau này không cần vì để config trong file config.json query trả về raw: true
                })
            }
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}