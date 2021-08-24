const User = require("../model/User.model");
const setToken = require("../tools/setToken");

const signupService = async (userInfo) => {
  try {
    const NewUser = await User.create(userInfo);
    return NewUser;
  } catch (err) {
    throw Error(err.message);
  }
};

const singinService = async (email, password) => {
  try {
    const user = await User.CheckExistUser(email, password);

    if (
      user.msg &&
      (user.msg.includes("User") ||
        user.msg.includes("login") ||
        user.msg.includes("Password"))
    ) {
      throw Error([user.statusCode, user.msg]);
    }

    const token = await setToken(user.id);

    await User.update({ token: token }, { where: { id: user.id } });

    return {
      user,
      token,
    };
  } catch (err) {
    throw Error(err.message);
  }
};

const logoutService = async (user) => {
  try {
    await User.update({ token: "" }, { where: { id: user.id } });
  } catch (err) {
    throw Error(err.message);
  }
};

module.exports = { signupService, singinService, logoutService };
