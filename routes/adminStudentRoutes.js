const express = require("express");
const router = express.Router();

const { addStudent } = require("../controllers/adminStudentController");

router.get("/", addStudent);

module.exports = router;
