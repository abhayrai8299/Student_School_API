

require('dotenv').config()
const express=require('express');
const app=express();




const connectDB=require('./db/connect')

const Student=require('./models/students');

const School=require('./models/schools');


//EJS
app.set('view engine','ejs');

//Fake School n Student Info
const jsonProducts_Student=require('./Student_details.json')
const jsonProducts_School=require('./School_details.json')

//middleware
app.use(express.json())


app.get("/demo/:name",function(req,res)
{
    res.render('demo',{name:req.params.name})
})


//Get Student
app.get("/student/",async(req,res)=>{
    try{
        const student=await Student.find({})
        res.status(200).json({student})
   }catch(error)
   {
       res.status(500).json({msg:error})
   }
   res.send('all Student')
})
//Get School
app.get("/school/",async(req,res)=>{
    try{
        const school=await School.find({})
        res.status(200).json({school})
   }catch(error)
   {
       res.status(500).json({msg:error})
   }
   res.send('all school')
})


//Get Student By ID
app.get("/student/:id",async(req,res)=>
{
    try{
        const {id:ID}=req.params
        const student=await Student.findOne({_id:ID})
        if(!student){
            return res.status(404).json({msg:`No Student with id : ${ID}`})
        }
        res.status(200).json({student})
    }catch(error)
    {
         res.send(500).json({msg: error})
    }
   
})
//Get School By ID
app.get("/school/:id",async(req,res)=>
{
    try{
        const {id:ID}=req.params
        const school=await School.findOne({_id:ID})
        if(!school){
            return res.status(404).json({msg:`No School with id : ${ID}`})
        }
        res.status(200).json({school})
    }catch(error)
    {
         res.send(500).json({msg: error})
    }
   
})


//create a new Student
app.post("/student",async (req,res)=>{
    //const user=new Student(req.body)
    try{
        console.log(req.body)
      let student= await Student.create(req.body);
        student= await Student.create(jsonProducts_Student);
       res.status(200).json({message:'Student created',student})

    }catch(error)
    {
      //  res.status(400)
      console.log(error)
      const keys=Object.keys(error.errors);
      if(keys.length)
      {
          const message=error.errors[keys[0]]
          .properties.message
          console.log(message)
      }
        
    }

})
//create a new School
app.post("/school",async (req,res)=>{
    //const user=new Student(req.body)
    try{
        let school= await School.create(req.body);
        school= await School.create(jsonProducts_School);
      
       res.status(200).json({message:'Student created',school});
    }catch(error)
    {
      //  res.status(400)
      console.log(error)
      const keys=Object.keys(error.errors);
      if(keys.length)
      {
          const message=error.errors[keys[0]]
          .properties.message
          console.log(message)
      }
        
    }

})
//Pagination for School
app.get("/school",async (req,res)=>{
    //const user=new Student(req.body)
    try{
        let {page,size}=req.query;
        if(!page){
            page=1;
        }
        if(!size)
        {
            size=10;
        }
        const limit=parseInt(size);
        const skip=(page-1)*size;
        const School_pagination=await School.find().limit(limit).skip(skip);      
        res.send(School_pagination);
    }catch(error)
    {
      //  res.status(400)
      console.log(error)
      const keys=Object.keys(error.errors);
      if(keys.length)
      {
          const message=error.errors[keys[0]]
          .properties.message
          console.log(message)
      }
        
    }

})
//Pagination for Student
app.get("/student",async (req,res)=>{
    //const user=new Student(req.body)
    try{
        let {page,size}=req.query;
        if(!page){
            page=1;
        }
        if(!size)
        {
            size=10;
        }
        const limit=parseInt(size);
        const skip=(page-1)*size;
        const Student_pagination=await Student.find().limit(limit).skip(skip);      
        res.send(Student_pagination);
    }catch(error)
    {
      //  res.status(400)
      console.log(error)
      const keys=Object.keys(error.errors);
      if(keys.length)
      {
          const message=error.errors[keys[0]]
          .properties.message
          console.log(message)
      }
        
    }

})

//Update the Student Info
app.put("/student/:id",async(req,res)=>{

    try{
        const id=req.params.id;
        const update_Student=req.body;
        const options={new:true}
        const result=await Student.findByIdAndUpdate(id,update_Student,options);
        res.send(result);

    }catch(error){
        console.log(error.message);
    }
   
});

// Delete Student Info
app.delete("/student/:id",async(req,res)=>{
 try{
    const {id:ID}=req.params;
    const student=await Student.findOneAndDelete({_id:ID});
    if(!student)
    {
    return res.status(404).json({msg:`No student with id:${ID}`})
    }
    res.status(200).json({student})
 }catch(error)
 {
   res.send(500).json({msg:error})
 }
 })
// Delete School Info
app.delete("/school/:id",async(req,res)=>{
    try{
        const {id:ID}=req.params;
        const school=await School.findOneAndDelete({_id:ID});
        if(!school)
        {
        return res.status(404).json({msg:`No school with id:${ID}`})
        }
        res.status(200).json({school})
     }catch(error)
     {
         console.log(error)
       res.send(500).json({msg:error})
     }
     })

     //Search In School
     app.get("/school/search/:key",async(req,res)=>{
         console.log(req.params.key)
         let data=await School.find(
             {
                 "$or":[
                     {"name":{$regex:req.params.key}}
                 ]
             }
         )
         res.send(data);
     })
    
    


const port=process.env.PORT || 3000
const start =async()=>{
    try{
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server is listening port ${port}...`))
      
    }catch(error)
    {
        console.log(error)
    }
}
start()