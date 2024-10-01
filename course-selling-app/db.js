const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    email: {
        type: String,
        unique: true,
        maxlength: 100,
        required: true
    },
    firstName: {
        type: String,
        maxlength: 100,
        required: true
    },
    lastName: {
        type: String,
        maxlength: 100,
        required: true
    },
    password: {
        type: String,
        maxlength: 30,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Admin = new Schema({
    email: {
        type: String,
        unique: true,
        maxlength: 100,
        required: true
    },
    firstName: {
        type: String,
        maxlength: 100,
        required: true
    },
    lastName: {
        type: String,
        maxlength: 100,
        required: true
    },
    password: {
        type: String,
        maxlength: 30,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = new Schema({
    courseId: ObjectId,
    title: {
        type: String,
        maxlength: 100,
        required: true
    },
    description: {
        type: String,
        maxlength: 1000,
        required: true
    },
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
    isLive: {
        type: Boolean,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const PurchaseInfo = new Schema({
    courseId:{
        type: String,
        required: true
    },
    userId: ObjectId,
    purchaseId:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const UserModel = mongoose.model('users', User);
const AdminModel = mongoose.model('admin', Admin);
const CourseModel = mongoose.model('course', Course);
const PurchaseInfoModel = mongoose.model('purchase', PurchaseInfo);

module.exports - {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseInfoModel
}