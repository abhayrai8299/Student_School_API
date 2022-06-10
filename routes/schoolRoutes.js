const express=require('express')
const router=express.Router()

const {schoolPost,
    schoolPagination,
    schoolSearch,
    schoolID,
    schoolDelete,
    schoolUpdate,
    schoolGet,

}=require("../controllers/schoolController");

router.get("/:id",schoolID)
      .get("/",schoolGet)
      .post("/",schoolPost)
      .delete("/:id",schoolDelete)
      .put("/:id",schoolUpdate)
      .get("/",schoolPagination)
      .get("/:key",schoolSearch)
      
      module.exports = router;