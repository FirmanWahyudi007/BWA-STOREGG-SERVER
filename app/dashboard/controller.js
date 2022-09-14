const Transaction = require("../transaction/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Player = require("../player/model");

module.exports = {
  index: async (req, res) => {
    try {
      const transaction = await Transaction.countDocuments();
      const voucher = await Voucher.countDocuments();
      const player = await Player.countDocuments();
      const category = await Category.countDocuments();
      res.render("admin/dashboard/view_dashboard", {
        title: "Express",
        name: req.session.user.nama,
        transaction,
        voucher,
        player,
        category,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
