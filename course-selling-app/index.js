const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");
require("dotenv").config();

const { UserModel, AdminModel, CourseModel, PurchaseInfoModel } = require("./db");
const { auth } = require("./auth");
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main(){
    
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(3000);
    console.log("Listening on Port 3000")
}

main();