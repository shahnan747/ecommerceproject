const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
    try {

        const { name, email, password, role} = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            user: newUser
        });

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            const error = new Error("Invalid Credentials");
            error.statusCode = 401;
            return next(error);
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({ token });

    } catch (error) {
        next(error);
    }
};