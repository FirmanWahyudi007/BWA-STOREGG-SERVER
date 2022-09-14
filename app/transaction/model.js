const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "nama game harus diisi"] },
      category: { type: String, require: [true, "kategori harus diisi"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "nama koin harus diisi"] },
      coinQuantity: { type: Number, require: [true, "jumlah koin harus diisi"] },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, "nama pembayaran harus diisi"] },
      type: { type: String, require: [true, "tipe pembayaran harus diisi"] },
      bankName: { type: String, require: [true, "nama bank harus diisi"] },
      noRekening: { type: String, require: [true, "nomor rekening harus diisi"] },
    },
    name: {
      type: String,
      require: [true, "nama harus diisi"],
      maxLenght: [225, "nama harus 3 - 225 karakter"],
      minLenght: [3, "nama harus 3 - 225 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "nama harus diisi"],
      maxLenght: [225, "nama harus 3 - 225 karakter"],
      minLenght: [3, "nama harus 3 - 225 karakter"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      require: [true, "tipe pembayaran harus diisi"],
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: { type: String, require: [true, "nama harus diisi"] },
      phoneNumber: {
        type: String,
        require: [true, "nomor telepon harus diisi"],
        maxLenght: [13, "nomor telepon harus 10 - 13 karakter"],
        minLenght: [10, "nomor telepon harus 10 - 13 karakter"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Transaction", transactionSchema);
