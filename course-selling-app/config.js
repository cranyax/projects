const JWT_USER_SECRET = process.env.JWT_USER_SECRET
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;
const saltRounds = process.env.saltRounds;

module.exports = {
    JWT_ADMIN_SECRET,
    JWT_USER_SECRET,
    saltRounds
}