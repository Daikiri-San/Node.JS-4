const { userModel } = require("./users.model");

class UserController {
  async getCurrent(req, res, next) {
    try {
      const user = await userModel.findUserById(req.user._id);
      if (!user) {
        return res.status(401).json({ message: "Not authorized" });
      }
      return res
        .status(200)
        .json({ email: user.email, subscription: user.subscription });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
