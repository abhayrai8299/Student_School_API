const express=require('express')
const router=express.Router()

const {
    addSchool,
}=require("../controllers/adminSchoolController")

router.get("/",addSchool)

module.exports = router;