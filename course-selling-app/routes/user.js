const { Router } = require("express");

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
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

userRouter.post("/signin", (req, res) => {
    
})

userRouter.post("/purchases", (req, res) => {
    
})


module.exports = {
    userRouter: userRouter
}