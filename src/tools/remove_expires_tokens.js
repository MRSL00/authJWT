const User = require("../model/User.model");
const jwt = require("jsonwebtoken");

const remove_expires_tokens = async () => {
  try {
    const tokens = await User.findAll({}, { _id: 1, token: 1 });
    tokens.forEach(async (tokens) => {
      try {
        const CheckExpirs = jwt.verify(tokens.token, "secret");
      } catch (error) {
        if (error.message.includes("expired")) {
          await User.update({ token: "" }, { where: { id: tokens.id } });
          console.log("Expire Token is removed...");
        }
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { remove_expires_tokens };
