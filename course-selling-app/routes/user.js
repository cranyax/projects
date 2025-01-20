const { Router } = require("express");
const { userMiddleware } = require("../middlewares/user");
const { userModel, courseModel, purchaseModel } = require("../db");
const { JWT_USER_SECRET, saltRounds } = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            firstName: z.string().min(3).max(100),
            lastName: z.string().min(3).max(100),
            password:z.string().min(8).max(30).regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)/,
                "Password must contain 1 Uppercase letter, 1 Lowercase letter, 1 Number, and 1 Special Character"
            )
        })

        const parsedDataWithSuccess = requiredBody.safeParse(req.body);

        if(!parsedDataWithSuccess.success){
            res.json({
                message: "Incorrect format",
                error: parsedDataWithSuccess.error 
            })
            return
        }

        const { email, password, firstName, lastName } = req.body;

        await userModel.create({
            email: email,
            password: await bcrypt.hash(password, saltRounds),
            firstName: firstName, 
            lastName: lastName
        })
        
        res.json({
            message: "Signup successful"
        })

    } catch (error) {
        res.status(500).json({
            message: "Error while signing up"
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_USER_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async (req, res) => {
    
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    const coursesData = await courseModel.find({
        _id: {$in: purchases.map(x => x.courseId)}
    })

    res.json({
        purchases,
        coursesData
    })
})


module.exports = {
    userRouter: userRouter
}