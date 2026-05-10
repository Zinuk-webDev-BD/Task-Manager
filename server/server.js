const express = require("express");
const app = express();
const router = require("./route");
const dbConfig = require("./configs/dbConfig");
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dns = require("dns");
const cloudinaryConfig = require("./configs/cloudinary");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
cloudinaryConfig();
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
     origin: "http://localhost:5173",
     credentials: true,
}),
);
app.use(router);
dbConfig();



app.listen(8000, ()=> console.log("server is running"));


// task manager

//HpCsOmm1xoS1Chgx