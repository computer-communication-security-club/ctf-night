const mongoose = require("mongoose")
const dbConnect = async (uri) => {

    mongoose.set("strictQuery", false);
    await mongoose.connect(uri,{
        useNewUrlParser: true
    })
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect