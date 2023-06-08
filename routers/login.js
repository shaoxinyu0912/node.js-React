const UserSchema = require("../models/users");
const { jwtSign } = require("../jwt/jwt");
const md5 = require("md5");

const express = require("express");
const Router = express.Router();

Router.post("", (req, res) => {
  const { phone, password } = req.body;
  const md5Password = md5(password);
  const token = jwtSign({ phone, password: md5Password });
  UserSchema.findOne({ phone, password: md5Password }).then((data) => {
    if (data) {
      res.json({ token, errcode: 0, errmsg: "success" });
    } else {
      res.status(400).json({ errmsg: "账号密码错误" });
    }
  });
});

module.exports = Router;
