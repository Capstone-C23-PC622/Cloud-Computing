const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true
    },
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const { __v, ...object } = this.toObject();
    object._id = object._id.toString();
    return object;
};


module.exports = mongoose.model('users', userSchema);