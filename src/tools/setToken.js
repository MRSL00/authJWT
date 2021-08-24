const jwt = require("jsonwebtoken");

const setToken = (userId) => {
  const token = jwt.sign({ id: userId.toString() }, "secret", {
    expiresIn: "120s",
  });

  return token;
};

module.exports = setToken;
