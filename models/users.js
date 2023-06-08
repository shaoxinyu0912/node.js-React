const mongoose = require("mongoose");
/** 解决注册时间偏移问题 */
const localDate = (v) => {
  const d = new Date(v || Date.now());
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString();
};
const UserSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  show_name: {
    type: String,
    require: true,
  },
  created_at: {
    type: Date,
    default: localDate(),
  },
  updated_at: {
    type: Date,
    default: localDate(),
  },
  password: {
    type: String,
    //   require: true,
  },
});

// UserSchema.virtual("formattedCreationDate").get(function () {
//   return this.updated_at.toLocaleString(); // or day.js/luxon
// });
module.exports = mongoose.model("users", UserSchema);
