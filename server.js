const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { HOST, PORT, NAME } = require("./config/config");
const users = require("./routers/users");
const app = express();

const port = 5000;
// 全局转换json
app.use(bodyParser.json());
// 拿到post里面的值
app.use(bodyParser.urlencoded({ extended: false })),
  // 连接数据库
  mongoose
    .connect(`mongodb://${HOST}:${PORT}/${NAME}`)
    .then(() => {
      console.log(`成功连接到${port}域名数据库`);
    })
    .catch(() => {
      `${port}数据库连接失败`;
    });
// 全局挂载用户路由信息
app.use("/api", users);
app.listen(port, () => {
  console.log(`启动${port}端口成功`);
});
