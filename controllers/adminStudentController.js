var studentModel = require("../models/students");


const addStudent=async(req,res) => {
       const student= await studentModel.find({});
       res.render('student',{student});
}

module.exports=
{
    addStudent
};