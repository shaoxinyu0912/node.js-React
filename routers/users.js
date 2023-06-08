const express = require("express");
const UserSchema = require("../models/users");
const Routers = express.Router();

Routers.get("/customer", (req, res) => {
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
  UserSchema.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "注册邮箱已经存在" });
    } else {
      const newUser = new UserSchema({
        email: req.body.email,
        phone: req.body.phone,
        show_name: req.body.show_name,
        password: req.body.password,
      });
      newUser
        .save()
        .then((data) => res.json(data))
        .catch((err) => console.log(err));
    }
  });
});
// Routers.patch("/", (req, res) => {});
// Routers.delete("/", (req, res) => {});

module.exports = Routers;
