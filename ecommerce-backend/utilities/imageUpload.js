const cloudinary = require("../config/cloudinaryConfig");

const uploadCloudinary = (filepath) => {
    return new Promise((resolve,reject) => {
        cloudinary.uploader.upload(
            filePath,
            {folder: 'products' },
            (error,result) => {
                if (error) return reject(error)
                    resolve(result.secure_url)
            }
        )
    })
}

module.exports = uploadCloudinary