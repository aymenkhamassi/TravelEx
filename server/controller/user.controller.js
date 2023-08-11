const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../config/jwt.config");
const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET

module.exports = {
    registerUser: async (req, res) => {
        try {
            const user = new User(req.body);
            const newUser = await user.save();
            const userToken = jwt.sign({ id: newUser._id }, SECRET);
            res
                .status(201)
                .cookie("userToken", userToken, { httpOnly: true })
                .json({ message: "Registration successful", userToken, user: newUser });

        } catch (err) {
            res.status(400).json({ error: err });
        }
    },
    loginUser: async (req, res) => {
        const userFromDB = await User.findOne({ email: req.body.email });
        if (!userFromDB) {
            return res.status(400).json({ error: "Email does not exist" });
        } else {
            try {
                const isPasswordValid = await bcrypt.compare(req.body.password, userFromDB.password);
                if (isPasswordValid) {
                    const userToken = jwt.sign({ id: userFromDB._id }, SECRET);
                    res.status(201)
                        .cookie("userToken", userToken)
                        .json({ message: "Login successful" });
                } else {
                    res.status(400).json({ error: "Password is wrong" });
                }
            } catch (error) {
                res.status(400).json({ error: "Invalid credentials" });
            }
        }
    },
    logout: async (req, res) => {
        res.clearCookie("userToken");
        res.json({ message: "User Logged Out !" });
    },
    getLoggedInUser: async (req, res) => {
        try {
            const user = jwt.verify(req.cookies.userToken, SECRET);
            const loggedInUser = await User.findOne({ _id: user.id });
            if (!loggedInUser) {
                return res.status(404).json({ error: "User not found" });
            }
            res.json(loggedInUser);
        } catch (err) {
            res.status(401).json({ error: "Invalid token" });
        }
    }
}

//?=================Get All user===============
module.exports.readAll = (req, res) => {
    User.find()
        .then((allUser) => {
            res.json(allUser)
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', error: err })
        })
};

//?=================Get User by Id===============
module.exports.getUserById = (req, res) => {
    User.findById(req.params.id)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json({ msg: 'user not found', err }))
};

//?=================Update User===============
// module.exports.updateUser = (request, response) => {
//     User.findOneAndUpdate({_id: request.params.id}, request.body,{new:true, runValidators: true})
//         .then(updatedPost => response.json(updatedPost))
//         .catch(err => response.status(400).json(err))
// }

module.exports.updateUser = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    const updatedProject = {
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      image: req.file ? url + '/' + req.file.filename : req.body.image,
      image1: req.file ? url + '/' + req.file.filename : req.body.image1,
      bio: req.body.bio,
      
    };
    User.findByIdAndUpdate(req.params.id, updatedProject, { new: true })
      .then((project) => res.json(project))
      .catch((err) => res.status(400).json(err));
  };
  


//?=================Delete user===============
module.exports.deleteUser = (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}