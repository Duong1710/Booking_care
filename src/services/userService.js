
import db from "../models/index.js";
import bcrypt from "bcryptjs"; // import thư viện
const salt = bcrypt.genSaltSync(10); // câu lệnh để harsh password
let hashUserPassword = (password) => {
    // Promise để chắc chắn hàm sẽ chạy: hàm này sẽ bảo nodejs rằng m phải chạy tao xog rồi mới chạy cái khác
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt); // thay đổi, pump password
            resolve(hashPassword); // Trả về password
        } catch (e) {
            reject(e);
        }
    })
}


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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email có tồn tại không đã
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email is already existed, please try another one"
                })
            }
            else {
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

                resolve({
                    errCode: 0,
                    message: 'OK'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: `This user is not exist`
                })
            }
            else {
                await db.User.destroy({
                    where: { id: userId }
                })
                resolve({
                    errCode: 0,
                    message: `This user is deleted`
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 3,
                    errMessage: "Missing input id"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                /* hàm có sẵn của sequelize, chỉ hoạt động khi raw để là false (mặc định của squelize),
                 trong khi bài chúng ta đang cấu hình raw: true trong file config nên chúng ta thêm raw: false ở đoạn tìm user */
                resolve({
                    errCode: 0,
                    message: `Update user is completed`
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: `User is not found`
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}