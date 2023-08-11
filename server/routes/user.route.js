const UserController= require('../controller/user.controller')
const { authenticate } = require('../config/jwt.config');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const DIR = './public/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

module.exports=(app)=>{
    //!=============create/update User=========
    app.get("/api/User",authenticate, UserController.readAll);// Find All Users
    app.post("/api/User" ,UserController.registerUser);// Create an Account
    app.post("/api/users/login", UserController.loginUser); // Login
    app.get("/api/User/:id", UserController.getUserById); // Find One User ==> Profile
    app.put("/api/User/:id/edit",upload.single('image'),UserController.updateUser); // Update Profile 
    app.delete("/api/User/:id/delete", UserController.deleteUser); // Delete an User
    app.post("/api/users/logout",  UserController.logout); // Logout
    app.get("/api/getLoggedInUser",UserController.getLoggedInUser) //loginData
}