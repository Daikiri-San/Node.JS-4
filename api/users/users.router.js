const { Router } = require("express");
const { UserController } = require("./users.controller");
const { AuthController } = require("../auth/auth.controller");

const userRouter = Router();

userRouter.get("/current", AuthController.authorize, UserController.getCurrent);
userRouter.patch(
  "/:userId",
  AuthController.authorize,
  UserController.updateSubscription
);

module.exports = {
  userRouter,
};
