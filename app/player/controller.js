const Player = require("./model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Bank = require("../bank/model");
const Payment = require("../payment/model");
const Nominal = require("../nominal/model");
const Transaction = require("../transaction/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find().select("_id name status category thumbnail").populate("category");
      res.status(200).json({
        data: voucher,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "internal server error",
      });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id }).populate("category").populate("nominals").populate("user", "_id name phoneNumber");
      if (!voucher) {
        return res.status(404).json({
          message: "voucher not found",
        });
      }
      res.status(200).json({
        data: voucher,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "internal server error",
      });
    }
  },
  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({
        data: category,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "internal server error",
      });
    }
  },
  checkout: async (req, res) => {
    try {
      const { accountUser, name, nominal, voucher, payment, bank } = req.body;

      const res_voucher = await Voucher.findOne({ _id: voucher })
        .select("name caegory _id thumbnail user")
        .populate("category")
        .populate("user");

      if (!res_voucher) return res.status(404).json({ message: "voucher game tidak ditemukan." });

      const res_nominal = await Nominal.findOne({ _id: nominal });

      if (!res_nominal) return res.status(404).json({ message: "nominal tidak ditemukan." });

      const res_payment = await Payment.findOne({ _id: payment });

      if (!res_payment) return res.status(404).json({ message: "payment tidak ditemukan." });

      const res_bank = await Bank.findOne({ _id: bank });

      if (!res_bank) return res.status(404).json({ message: "payment tidak ditemukan." });

      let tax = (10 / 100) * res_nominal._doc.price;
      let value = res_nominal._doc.price - tax;

      console.log("res_payment >>");
      console.log(res_payment._doc);
      const payload = {
        historyVoucherTopup: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category ? res_voucher._doc.category.name : "",
          thumbnail: res_voucher._doc.thumbnail,
          coinName: res_nominal._doc.coinName,
          coinQuantity: res_nominal._doc.coinQuantity,
          price: res_nominal._doc.price,
        },
        historyPayment: {
          name: res_bank._doc.name,
          type: res_payment._doc.type,
          bankName: res_bank._doc.bankName,
          noRekening: res_bank._doc.noRekening,
        },

        name: name,
        accountUser: accountUser,
        tax: tax,
        value: value,
        player: req.player._id,
        historyUser: {
          name: res_voucher._doc.user?.name,
          phoneNumber: res_voucher._doc.user?.phoneNumber,
        },

        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id,
      };

      const transaction = new Transaction(payload);

      await transaction.save();

      res.status(201).json({
        data: transaction,
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` });
    }
  },
};
