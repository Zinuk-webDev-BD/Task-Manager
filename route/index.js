const express = require("express");
const router = express.Router()
const authRoute = require("./authRoute")

router.get("/", (req, res) => {
    res.status(200).send("Hello From Server")
})

router.use("/auth", authRoute)

module.exports = router;

// mongodb+srv://task-manager:bOotFo8eDI4ZV4sw@cluster0.hppyt.mongodb.net/taskManager-node2601?appName=Cluster0