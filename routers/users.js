const express = require("express");
const md5 = require("md5");
const UserSchema = require("../models/users");
const { jwtCheck } = require("../jwt/jwt");
const Routers = express.Router();
// 查询所有用户信息
Routers.get("/customer", jwtCheck, (req, res) => {
  UserSchema.find()
    .then((data) => {
      res.json({
        errmsg: "success",
        data,
        errcode: 0,
      });
    })
    .catch(() => {
      res.status(500).json({ errcode: 1001 });
    });
});
// 注册用户
Routers.post("/register", (req, res) => {
  UserSchema.findOne({ phone: req.body.phone }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "注册邮箱已经存在" });
    } else {
      const newUser = new UserSchema({
        email: req.body.email,
        phone: req.body.phone,
        show_name: req.body.show_name,
        password: md5(req.body.password),
      });
      newUser
        .save()
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
    }
  });
});

// 查询单个数据信息
Routers.get("/customer/:id", jwtCheck, (req, res) => {
  UserSchema.findById({ _id: req.params.id })
    .then((data) => {
      res.json({ errmsg: "success", data, errcode: 0 });
    })
    .catch(() => {
      res.status(400).json({ errcode: 1001 });
    });
});
// 删除单个数据信息
Routers.delete("/customer/:id", (req, res) => {
  UserSchema.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json({ errmsg: "success", data, errcode: 0 });
    })
    .catch(() => {
      res.status(400).json({ errcode: 1001 });
    });
});

module.exports = Routers;
