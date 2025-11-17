const loginService = require('../services/loginService');
const { asyncHandler } = require('../middlewares');
const validator = require('../utils/validator');

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await validator.userLogin(username, password);
    const loggedUser = await loginService.login(user);
    res.status(200).json(loggedUser);
});

module.exports = {
    login,
};
