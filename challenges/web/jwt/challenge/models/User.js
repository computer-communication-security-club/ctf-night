const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {
        type : String,
        require: [true,"username must be exist"],
        maxlength : 20
    },
    email : {
        type : String,
        require : [true,"email must be exist"],
        maxlength : 30
    },
    password: {
        type : String,
        require : [true,"password must be exist"],
    }
})

module.exports = mongoose.model("User",UserSchema)