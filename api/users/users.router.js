const { Router } = require("express");
const { UserController } = require("./users.controller");
const { AuthController } = require("../auth/auth.controller");

const userRouter = Router();

userRouter.get("/current", AuthController.authorize, UserController.getCurrent);

module.exports = {
  userRouter,
};
