const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const create = async({ email, password, profilePhotoUrl }) => {
    const passwordHash = await bcrypt.hash(password, 14);
    return User.insert({ email, passwordHash, profilePhotoUrl });
};

const authorize = async({ email, password }) => {
    const user = await User.findByEmail(email);
    if(!user) throw new Error('Invalid email/password');

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
    if(!passwordsMatch) throw new Error('Invalid email/password');

    return user;
};

module.exports = {
    create,
    authorize
};