const express = require("express");
const router = express.Router()
const authRoute = require("./authRoute")

router.get("/", (req, res)=>{
    res.status(200).send("Hello From Server")
})

router.use("/auth", authRoute)

module.exports = router;

// 7w2dG2pBdyok6JSv
