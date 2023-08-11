const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bcrypt = require("bcrypt");



const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength:[3, "{PATH} must be at least 3 chars"],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength:[3, "{PATH} must be at least 3 chars"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    unique: [true, "Email already exists"],
    validate: {
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be 8 characters or longer"]
  },
  image: {
    type: String,
    default: "https://th.bing.com/th/id/R.1dd4108564c06d482864368a0c33171b?rik=oGE%2fm%2fRMdO7ROQ&pid=ImgRaw&r=0"
  },
  image1: {
    type: String,
    default: "https://th.bing.com/th/id/R.67f3c87884436a35cf9991d13adf93fd?rik=tB9ndMh9dfvhAg&pid=ImgRaw&r=0"
  },
  bio: {
    type: String,
},

}, { timestamps: true });


UserSchema.plugin(uniqueValidator);


// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
  .get(() => this._confirmPassword)
  .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
  }
  next();
});


UserSchema.pre('save', function (next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});


const User = mongoose.model("User", UserSchema);

module.exports = User;