const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "School name must be provided"],
  },
  city: {
    type: String,
    required: [true, "School City name must be provided"],
  },
  state: {
    type: String,
    required: [true, "School  State name must be provided"],
  },
  established_year: {
    type: Date,
    required: [true, "School established_year must be provided"],
  },
});
module.exports = mongoose.model("School", SchoolSchema);
