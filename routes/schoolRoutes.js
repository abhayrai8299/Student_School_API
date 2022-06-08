const express=require('express')
const router=express.Router()

const {schoolPost,
    schoolPagination,
    schoolSearch,
    schoolID,
    schoolDelete,
    schoolUpdate,
    schoolGet
}=require("../controllers/schoolController");

router.get("/school/:id",schoolID)
      .get("/school",schoolGet)
      .post("/school/create",schoolPost)
      .delete("/school/:id",schoolDelete)
      .put("/school/:id",schoolUpdate)
      .get("/school",schoolPagination)
      .get("/school/search/:key",schoolSearch);



      module.exports = router;