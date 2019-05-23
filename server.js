const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const data = require("./data/accounts-model");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("check", (req, res) =>
  res.status(200).json({ location: "localhost:4000" })
);

server.get("api/accounts", (req, res) => {
  res.status(200).json(data.find());
});

server.get("api/accounts/:id", async (req, res) => {
  try {
    res
      .status(200)
      .json(res.status(200).json(await data.findById(req.params.id)));
  } catch (exception) {
    res.status(500).json({
      error_message: "Unable to get data from accounts"
    });
  }
});

server.post("api/accounts", async (req, res) => {
  try {
    res.status(200).json(await res.status(200).json(await data.add(req.body)));
  } catch (exception) {
    res.status(500).json({
      error_message: "Unable to add data in accounts"
    });
  }
});

server.put("api/accounts/:id", async (req, res) => {
  try {
    res
      .status(200)
      .json(
        await res.status(200).json(await data.update(req.params.id, req.body))
      );
  } catch (exception) {
    res.status(500).json({
      error_message: "Unable to update data in accounts"
    });
  }
});

server.delete("api/accounts/:id", async (req, res) => {
  try {
    res
      .status(200)
      .json(await res.status(200).json(await data.remove(req.params.id)));
  } catch (exception) {
    res.status(500).json({
      error_message: "Unable to delete data in accounts"
    });
  }
});

if (process.env.ENV === "production") app.use(morgan("combined"));
else app.use(morgan("dev"));

module.exports = server;
