const studentModel=require('../models/students');
const jsonProducts_Student=require('../Student_details.json')

function printerror(err)
{
    console.log(err)
      const keys=Object.keys(err.errors);
      if(keys.length)
      {
          const message=err.errors[keys[0]]
          .properties.message
          console.log(message)
      }
}

const studentPagination=async (req,res)=>{
    //const user=new Student(req.body)
    try{
        const page=req.query.page||1;
        const size=10;
        const limit=parseInt(size);
        const skip=(page-1)*size;
        const Student_pagination=await studentModel.find().limit(limit).skip(skip);      
        res.send(Student_pagination);
    }catch(error)
    {
       printerror(error)
        
    }
}
const studentDelete=async(req,res)=>{
    try{
       const {id:ID}=req.params;
       const student=await studentModel.findOneAndDelete({_id:ID});
       if(!student)
       {
       return res.status(404).json({msg:`No student with id:${ID}`})
       }
       res.status(200).json({student})
    }catch(error)
    {
      res.send(500).json({msg:error})
    }
}
const studentPost=async (req,res)=>{
    //const user=new Student(req.body)
    try{
        console.log("Student")
        console.log(req.body)
      let student= await studentModel.create(req.body);
      console.log(student)
        // student= await studentModel.create(jsonProducts_Student);
       res.status(200).json({message:'Student created',student})

    }catch(error)
     {
      printerror(error)
     
      }
        
    }
const studentID=async(req,res)=>
{
    try{
        const {id:ID}=req.params
        const student=await studentModel.findOne({_id:ID})
        if(!student){
            return res.status(404).json({msg:`No Student with id : ${ID}`})
        }
        res.status(200).json({student})
    }catch(error)
    {
         res.send(500).json({msg: error})
    }
   
}
const studentSearch=async(req,res)=>{
    const data=await studentModel.find(
        {
            "$or":[
                {"name":{$regex:req.params.key}}
            ]
        }
    )
    res.status(200).json({result:data});
}
const studentUpdate=async (req,res)=>{
    try{
        const {id:ID}=req.params
       const data=await studentModel.findOneAndUpdate({_id:ID},req.body,{
           new:true,
           runValidators:true,
       })
       if(!data)
       {
           return res.status(404).json({msg:`No school with id:${ID}`})
       }
       res.status(200).json({data})
    }catch(error)
    {
        res.status(500).json({msg:error})

    }
}
const studentGet=async(req,res)=>{
    try{
        const student=await studentModel.find({})
        res.status(200).json({student})
   }catch(error)
    {
        res.status(500).json({msg:error})
    }
    res.send('all items')
}

module.exports={
    studentPagination,
    studentDelete,
    studentPost,
    studentID,
    studentSearch,
    studentUpdate,
    studentGet
};