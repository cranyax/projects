const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");
const { saltRounds, JWT_ADMIN_SECRET } = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
        password: z.string().min(8).max(30).regex(
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

    // try {
        const { email, password, firstName, lastName } = req.body;

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(email, password, hashedPassword, firstName, lastName);
        
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName, 
            lastName: lastName
        })
        
        res.json({
            message: "Signup successful"
        })

    // } catch (error) {
    //     res.status(500).json({
    //         message: "Error while signing up", 
    //         error: error.message
    //     })
    // }
})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = await adminModel.findOne({
        email: email
    });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (user && passwordMatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_ADMIN_SECRET);

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

// adminRouter.use(adminMiddleware);

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
         title: title, 
         description: description, 
         imageUrl: imageUrl, 
         price: price, 
         creatorId: adminId
    })
    
    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.findOne({
        courseId: courseId,
        creatorId: adminId
    })
    
    if(course){
        await courseModel.updateOne({
            _id: courseId,
            creatorId: adminId
        },{
            title: title, 
            description: description, 
            imageUrl: imageUrl, 
            price: price, 
            creatorId: adminId
        })
        
        res.status(200).json({
            message: "Course updated",
            courseId: course._id
        })
    } else {
        res.status(403).json({
            message: "Some error occured"
        })
    }
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });
   
    res.json({
        courses
    })
})


module.exports = {
    adminRouter: adminRouter
}