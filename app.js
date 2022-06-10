require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");


const app = express();

//Database
const connectDB = require("./db/connect");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

//EJS
app.set("view engine", "ejs");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

//routing
const schoolRoutes = require("./routes/schoolRoutes");
const studentRoutes = require("./routes/studentRoutes");
const adminSchoolRoute=require("./routes/adminSchoolRoutes");
const adminStudentRoute=require("./routes/adminStudentRoutes");

app.use(express.json());

//Navigation
app.get("", (req, res) => {
  res.render("index");
});

// app.post('/school',urlencodedParser, (req, res) => {
//     res.json(req.body)
//   })
//   app.post('/student',urlencodedParser, (req, res) => {
//     res.json(req.body)
//   })

//use of Routes
app.use("/api/v1/school", schoolRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/school",adminSchoolRoute);
app.use("/student",adminStudentRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
