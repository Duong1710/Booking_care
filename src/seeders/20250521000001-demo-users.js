'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('123456', 10);

        return queryInterface.bulkInsert('Users', [
            {
                username: 'admin',
                email: 'admin@example.com',
                password: hashedPassword,
                fullName: 'Admin User',
                phoneNumber: '0123456789',
                dateOfBirth: '1990-01-01',
                gender: 'male',
                address: 'Hà Nội',
                status: 'active',
                role: 'admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'user1',
                email: 'user1@example.com',
                password: hashedPassword,
                fullName: 'Nguyễn Văn A',
                phoneNumber: '0987654321',
                dateOfBirth: '1995-05-15',
                gender: 'male',
                address: 'Hồ Chí Minh',
                status: 'active',
                role: 'user',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'user2',
                email: 'user2@example.com',
                password: hashedPassword,
                fullName: 'Trần Thị B',
                phoneNumber: '0912345678',
                dateOfBirth: '1998-08-20',
                gender: 'female',
                address: 'Đà Nẵng',
                status: 'active',
                role: 'user',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
}; 