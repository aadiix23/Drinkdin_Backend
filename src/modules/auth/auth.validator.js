const {body,validationResult} =require("express-validator");

const registerValidator=[
    body("fullname")
    .trim()
    .notEmpty().withMessage("Full name is required"),

    body("username")
    .trim()
    .notEmpty().withMessage("Username Is Required"),

    body("age")
    .isNumeric().withMessage("Age Must Be A Number")
    .notEmpty().withMessage("Age Is Required"),

    body("email")
    .isEmail()
    .notEmpty().withMessage("Email is Required"),

    body("password")
    .ifbody("googleId").not().exists()
    .isLength({min:6}).withMessage("Password Must Be At Least 6 Characters")
    .notEmpty().withMessage("Password Is Required")
];

const validate=(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            errors:errors.array()
        });
    }
    next();
};

module.exports ={registerValidator,validate};
