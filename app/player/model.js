const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const HASH_ROUND = 10;

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
    name: {
      type: String,
      require: [true, "nama harus diisi"],
      minLenght: [3, "nama minimal 3 karakter"],
      maxLenght: [255, "nama maksimal 255 karakter"],
    },
    username: {
      type: String,
      require: [true, "username harus diisi"],
      minLenght: [3, "username minimal 3 karakter"],
      maxLenght: [255, "username maksimal 255 karakter"],
    },
    password: {
      type: String,
      require: [true, "password harus diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: [true, "nomor telepon harus diisi"],
      minLenght: [9, "nomor telepon minimal 9 karakter"],
      maxLenght: [13, "nomor telepon maksimal 13 karakter"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true },
);

playerSchema.path("email").validate(
  async function (value) {
    try {
      const count = await this.model("Player").countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} exists, please use another email`,
);

playerSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model("Player", playerSchema);
