const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: {type: String, required: true},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean,
    createdAt: {
      type: Date,
      default: Date.now
    }
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}