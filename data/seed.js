const chance = require('chance').Chance();
const UserService = require('../lib/services/user-service');
const Gram = require('../lib/models/gram');

module.exports = async ({ userCount = 5, gramCount = 500 } = {}) => {
    const users = await Promise.all([...Array(userCount)].map((_, i) => {
        return UserService.create({
            email: `test${i}@test.com`,
            password: `password${i}`,
            profilePhotoUrl: 'a.jpeg'
        });
    }));
}