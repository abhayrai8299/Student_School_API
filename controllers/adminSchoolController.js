var schoolModel = require("../models/schools");


const addSchool=async(req,res) => {
       const school= await schoolModel.find({});
       res.render('school',{school});
}

module.exports=
{
    addSchool
};