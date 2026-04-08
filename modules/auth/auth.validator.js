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
    .notEmpty().withMessage("Email is Required")

]