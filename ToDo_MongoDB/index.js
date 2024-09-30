const express = require("express");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());

const saltRounds = 10;

// Function to hash the password asynchronously
// async function hashPassword(password) {
//     try {
//         const hash = await bcrypt.hash(password, saltRounds);
//         return hash;
//     } catch (err) {
//         console.error("Error hashing password:", err);
//         throw err;
//     }
// }

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/signup", async function(req, res) {
    try{

        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            name: z.string().min(3).max(100),
            password: z.string().min(3, 'Password must be at least 3 characters long').max(30).regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one special character')
        })

        // const parsedData = requiredBody.parse(req.body);
        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if(!parsedDataWithSuccess.success){
            res.json({
                message: "Incorrect format",
                error: parsedDataWithSuccess.error 
            })
            return
        }

        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword =  await bcrypt.hash(password, saltRounds);
        const name = req.body.name;
        
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });

        res.json({
            message: "You are signed up"
        })
    } catch (err){
        res.status(500).json({
            message: "Error while signing up"
        })
    }
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await UserModel.findOne({
        email: email
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});


app.post("/todo", auth, async function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        userId,
        title,
        done
    });

    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    });

    res.json({
        todos
    })
});

app.listen(3000);