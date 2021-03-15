const Accounts = require("../api/accountsModel");

const checkID = async (req, res, next) => {
  const { id } = req.params;
  const idExist = await Accounts.getById(id);
  if (idExist) {
    next();
  } else {
    res.status(400).json({ message: `ID ${id} does not exist!` });
  }
};

const checkPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name && budget) {
    next();
  } else {
    res.status(400).json({ message: "Name and Budget required!" });
  }
};

module.exports = {
  checkID,
  checkPayload,
};
