const jwt = require("jsonwebtoken");
const User = require("../model/User.model");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secret");
    const user = await User.findOne({
      id: decoded.id,
      token: token,
    });

    if (!user) {
      return res.status(404).send("cant found user with this token!!!");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};




module.exports = auth;
