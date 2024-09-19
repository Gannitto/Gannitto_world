const { Schema, model } = require("mongoose")


const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    roles: [{ type: String, unique: true, ref: "Role" }],
    avatar: { type: String, default: null },
    arab_coin_condition: { type: Number, default: 0 }
})

module.exports = model("User", User)
