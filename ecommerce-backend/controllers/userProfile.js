const User = require("../models/user");

exports.getProfile = async(req,res) => {

    const user = await User.findById(req.user.id)
        .select("-password");

    res.json(user);
};

exports.updateProfile = async (req,res) => {
    const user = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true }
    );

    res.json(user);
};