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

  async updateSubscription(req, res, next) {
    const { subscription } = req.body;
    if (!subscription) {
      return res.status(400).json({
        message: "missing field subscription",
      });
    }
    const subscriptionTypes = ["free", "pro", "premium"];

    if (!subscriptionTypes.includes(subscription)) {
      return res.status(400).json({
        message: "this type of subscription does not exist",
      });
    }
    const { userId } = req.params;

    try {
      const searchedUser = await userModel.findUserById(userId);
      if (!searchedUser) return res.status(404).json({ message: "Not found" });
      const updatedContact = await userModel.updateUserById(userId, {
        subscription,
      });

      return res.status(200).json(updatedContact);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  UserController: new UserController(),
};
