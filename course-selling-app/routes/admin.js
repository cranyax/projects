const { Router } = require("express");
const { adminModel, courseModel } = require("../db");
const { adminMiddleware } = require("../middlewares/admin");
const { saltRounds, JWT_ADMIN_SECRET } = require("../config");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            firstName: z.string().min(3).max(100),
            lastName: z.string().min(3).max(100),
            password:string().min(8).max(30).regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)()/,
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

        await adminModel.create({
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

adminRouter.post("/course", adminMiddleware, (req, res) => {
    
})


module.exports = {
    adminRouter: adminRouter
}