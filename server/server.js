const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/user.route')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const app = express();


require("dotenv").config();
const port = process.env.PORT
app.use('/api/auth', userRoutes)

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }))

    app.use(express.static("public"));
// app.use(express.json(), express.urlencoded({ extended: true }));
app.use(express.json(),express.urlencoded({extended:true}),cookieParser());

// load the port
require("./config/mongoose.config")
require("./routes/user.route")(app)
require("./routes/post.route")(app)


app.listen(port, () => console.log(`Listening on port ${port} for REQuests to RESpond to.`));