const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get("/", async (req,res)=> {
    try {
        const accounts = await db("accounts");
        res.status(200).json({success: true, accounts});
    } catch {
        res.status(500).json({success: false, error:"Problem with request"});
    }
});

server.post("/", async(req,res)=> {
    try{
        const accounts = await db("accounts").insert(req.body);
        res.status(201).json({success:true, accounts});
    } catch {
        res.status(500).json({ success: false, error: "Problem with request." });
    }
});

server.put("/:id", async(req,res)=>{
   const {id} = req.params;
    try{
      const accounts = await db("accounts")
      .where({id})
      .update(req.body);
      res.status(200).json({success:true, accounts});

    } catch{
        res.status(500).json({ success: false, error: "Problem with request." });
    }
});


server.delete("/:id",  async(req,res)=>{
    const { id } = req.params;
  try {
    await db("accounts")
      .where({ id })
      .del();
    res
      .status(200)
      .json({
        success: true,
        message: `Account ${id} was successfully deleted`
      });
  } catch {
    res.status(500).json({ success: false, error: "Problem with request." });
  }
});




module.exports = server;