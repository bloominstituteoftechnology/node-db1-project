const { Router } = require("express");
const Account = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  const { title, contents } = req.body;
  if (title && contents) {
    next();
  } else {
    res.status(400).json({ message: "Title and contents are required" });
  }
};
Router.get("/", async (req, res, next) => {
  try {
    const data = await Account.get();

    res.json(data);
  } catch (err) {
    next(err);
  }
});

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
};
