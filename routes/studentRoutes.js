const express=require('express')
const router=express.Router()

const {studentPost,
    studentPagination,
    studentSearch,
    studentID,
    studentDelete,
    studentUpdate,
    studentGet
}=require("../controllers/studentController");

router.get("/student/:id",studentID)
      .get("/student",studentGet)
      .post("/student/create",studentPost)
      .delete("/student/:id",studentDelete)
      .put("/student/:id",studentUpdate)
      .get("/student",studentPagination)
      .get("/student/search/:key",studentSearch);


      module.exports = router;