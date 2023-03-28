require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authController = require("./controllers/authControllers");
const uploadController = require("./controllers/uploadController");
const roomController = require("./controllers/roomControllers");
const app = express();

mongoose.connect(process.env.MONGO_URI, () => console.log("Database is connected"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Welcome to travel app',
    });
  });
  
app.use('/images', express.static('public/images'));

app.use("/auth", authController);
app.use("/auth", authController);
app.use("/room", roomController)
app.use('/upload', uploadController)

const port = process.env.PORT;

app.listen(port, () => console.log("Server has been started successfully"));