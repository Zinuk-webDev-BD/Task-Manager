const crypto = require('crypto');
const jwt = require("jsonwebtoken");

function isValidateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
}


const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
}


const generateAccessToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SEC)
  return token;
}

function generateSlug(title) {
  return title
    .toString()
    .normalize('NFD')                   // Decompose combined graphemes (accents)
    .replace(/[\u0300-\u036f]/g, '')     // Remove accent marks
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')                // Replace spaces with -
    .replace(/[^\w-]+/g, '')             // Remove all non-word chars (except hyphens)
    .replace(/--+/g, '-');               // Replace multiple - with single -
}



module.exports = { isValidateEmail, validatePassword, generateOTP, generateAccessToken, generateSlug }