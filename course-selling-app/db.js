const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const adminSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const courseSchema = new Schema({
    courseId: ObjectId,
    title: {
        type: String,
        
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
    // isLive: {
    //     type: Boolean,
    //     required: true,
    // },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

const purchaseSchema = new Schema({
    courseId:{
        type: String,
        required: true,
    },
    userId: ObjectId,
    // purchaseId:{
    //     type: String,
    //     required: true,
    // }
    // ,
    // price: {
    //     type: Number,
    //     required: true,
    // }
})

const userModel = mongoose.model('users', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('course', courseSchema);
const purchaseModel = mongoose.model('purchase', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}