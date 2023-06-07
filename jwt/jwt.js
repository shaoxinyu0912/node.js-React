const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/config");

// 生成token函数
const jwtSign = (data) => {
  const token = jwt.sign(data, JWT_KEY, { expiresIn: 60 * 60 }); // 一个小时
  return token;
};

/**token 验证函数 */
const jwtCheck = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, JWT_KEY, (err, data) => {
    if (err) {
      res.status(404).json({ msg: "token无效" });
    } else {
      req.jwtInfo = data;
      next();
    }
  });
};

module.exports = {
  jwtSign,
  jwtCheck,
};
