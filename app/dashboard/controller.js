module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", { title: "Express", name: req.session.user.nama });
    } catch (err) {
      console.log(err);
    }
  },
};
