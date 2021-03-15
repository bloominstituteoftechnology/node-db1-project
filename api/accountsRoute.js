const express = require("express");
const Account = require("./accountsModel");
const mw = require("../middleware/middleware");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const grab = await Account.get();
    res.status(200).json(grab);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", mw.checkID, async (req, res, next) => {
  try {
    const grabID = await Account.getById(req.params.id);
    res.status(200).json(grabID);
  } catch (e) {
    next(e);
  }
});

router.post("/", mw.checkPayload, async (req, res, next) => {
  try {
    const postAccount = await Account.post(req.body);
    res.status(201).json(postAccount);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", mw.checkID, mw.checkPayload, async (req, res, next) => {
  try {
    const { id } = req.params;
    const edit = await Account.put(id, req.body);
    res.status(200).json(edit);
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", mw.checkID, async (req, res, next) => {
  try {
    const del = await Account.remove(req.params.id);
    res.status(200).json(del);
  } catch (e) {
    next(e);
  }
});

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
