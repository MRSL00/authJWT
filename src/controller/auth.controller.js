const {
  signupService,
  singinService,
  logoutService,
} = require("../service/auth.service");

const signupController = async (req, res) => {
  try {
    const signUpUser = await signupService(req.body);

    return res.status(201).send(signUpUser);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const signinController = async (req, res) => {
  try {
    const signinUser = await singinService(req.body.email, req.body.password);
    return res.status(200).send(signinUser);
  } catch (error) {
    const getError = error.message.split(",");
    if (!isNaN(getError[0])) {
      return res.status(getError[0]).send(getError[1]);
    }
  }
};

const logoutController = async (req, res) => {
  try {
    await logoutService(req.user);
    return res.status(200).send("logout successful :)");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { signupController, signinController, logoutController };
