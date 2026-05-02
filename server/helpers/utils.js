const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const generateOTP = () => {
    return crypto.randomInt(1000, 10000).toString();
}

const generateAccessToken = (user) => {
    const token = jwt.sign(user, process.env.JWT_SEC);
    return token
}


function generateSlug(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}
module.exports = { isValidEmail, generateOTP, generateAccessToken, generateSlug }