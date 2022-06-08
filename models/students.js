const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name must be provided"],
  },
  age: {
    type: Number,
    required: [true, "Student age must be provided"],
  },
  class: {
    type: String,
    required: [true, "Student class must be provided"],
  },
  school: {
   // type:mongoose.Schema.Types.ObjectId,
    type:String,
    ref:'School',
    required: [true, "School name must be provided"],
  },
  year_joined: {
    type: Date,
    required: [true, "Student year_joined must be provided"],
  },
});
module.exports = mongoose.model("Student", StudentSchema);
