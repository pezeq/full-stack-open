const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router();
const { asyncHandler } = require('../utils/middleware');
const config = require('../utils/config');
const validators = require('../utils/validators');


loginRouter.post('/', asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await validators.checkLogin(username, password);

    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const token = jwt.sign(userForToken, config.SECRET);

    res.status(200)
        .send({
            token,
            username: user.username,
            name: user.name
        });
}));


module.exports = loginRouter;


