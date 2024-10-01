const { Router } = require("express");
const { adminModel } = require("../db")

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {
    try {
        const requiredBody = z.object({
            email: z.string().min(3).max(100).email(),
            name: z.string().min(3).max(100),
            password:string().min(8).max(30).regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)()/,
                "Password must contain 1 Uppercase letter, 1 Lowercase letter, 1 Number, and 1 Special Character"
            )
        })
    } catch (error) {
        
    }
})

adminRouter.post("/signin", (req, res) => {
    
})

// adminRouter.use(adminMiddleware);

adminRouter.post("/course", (req, res) => {
    
})


module.exports = {
    adminRouter: adminRouter
}