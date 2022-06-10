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

router.get("/",studentGet)
       .get("/:id",studentID)
      .post("/",studentPost)
      .delete("/:id",studentDelete)
      .put("/:id",studentUpdate)
      .get("/",studentPagination)
      .get("/search/:key",studentSearch);


      module.exports = router;