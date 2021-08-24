const Seq = require("sequelize");
const seq = require("../db/connection");
const bcrypt = require("bcrypt");


const valid_pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const valid_phoneNumber = /^(\+98|0)?9\d{9}$/;

const User = seq.define(
  "User",
  {
    id: {
      type: Seq.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: Seq.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Seq.STRING,
      allowNull: false,
    },
    family: {
      type: Seq.STRING,
      allowNull: false,
    },
    email: {
      type: Seq.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: Seq.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: valid_phoneNumber,
      },
    },
    password: {
      type: Seq.STRING,
      allowNull: false,
      validate: {
        is: valid_pass,
      },
    },
    token: {
      type: Seq.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        user.password = await bcrypt.hash(user.password, 8);
      },
      beforeUpdate: async function (user) {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 8);
        }
      },
    },
  }
);

User.CheckExistUser = async (email, pass) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { statusCode: 404, msg: "User Not Found!!!" };
  }

  if (user.token && jwt.verify(user.token, "secret")) {
    return { statusCode: 400, msg: "you are login :)" };
  }

  const password = await bcrypt.compare(pass, user.password);

  if (!password) {
    return { statusCode: 400, msg: "Password is Wrong!!!" };
  }

  return user;
};

module.exports = User;
