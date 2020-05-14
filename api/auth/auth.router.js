const { Router } = require("express");
const { AuthController } = require("./auth.controller");

const authRouter = Router();

authRouter.post(
  "/register",
  AuthController.validateUser,
  AuthController.registerUser
);

authRouter.post(
  "/login",
  AuthController.validateUser,
  AuthController.logInUser
);

authRouter.patch("/logout", AuthController.authorize, AuthController.logOut);

module.exports = {
  authRouter,
};
