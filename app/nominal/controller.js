const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };
      console.log(alert);
      const nominal = await Nominal.find();
      res.render("admin/nominal/view_nominal", {
        nominal,
        alert,
        title: "Nominal",
        name: req.session.user.nama,
      });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/nominal");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create", { title: "Create Nominal", name: req.session.user.nama });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/nominal");
    }
  },
  actionCreate: async (req, res) => {
    try {
      let { coinName, coinQuantity, price } = req.body;

      price = strRP(price);

      let nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();

      req.flash("alertMessage", "Berhasil tambah nominal");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/nominal");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });
      res.render("admin/nominal/edit", { nominal, title: "Edit Nominal", name: req.session.user.nama });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/nominal");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      let { coinName, coinQuantity, price } = req.body;

      price = strRP(price);

      await Nominal.findOneAndUpdate(
        {
          _id: id,
        },
        { coinName, coinQuantity, price },
      );

      req.flash("alertMessage", "Berhasil ubah nominal");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/nominal");
    }
  },
  actioDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Nominal.findOneAndRemove({
        _id: id,
      });

      req.flash("alertMessage", "Berhasil hapus nominal");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/nominal");
    }
  },
};

function strRP(price) {
  var baru = price.replace("Rp. ", "");
  var replacePoint = baru.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
  var newPrice = Number(replacePoint);
  return newPrice;
}
