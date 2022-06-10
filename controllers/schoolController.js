const schoolModel=require('../models/schools');
const jsonProducts_School=require('../School_details.json');


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

const schoolPost=async (req,res)=>{
    try{
        let school= await schoolModel.create(req.body);
        school= await schoolModel.create(jsonProducts_School);
      
       res.status(200).json({message:'Student created',school});
    }catch(error)
    {
      printerror(error)
        
    }
}
const schoolPagination=async (req,res)=>{
    try{
        const page=parseInt(req.query.page)||1;
        const size=10;
        const limit=parseInt(size);
        const skip=(page-1)*size;
        const schoolPagination=await schoolModel.find().limit(limit).skip(skip);    
        res.status(200).json({results:schoolPagination});
    }catch(error)
    {
      printerror(error)// calling function
    }
}
const schoolSearch=async(req,res)=>{
    console.log(req.params.key)
    const data=await schoolModel.find(
        {
            "$or":[
                {"name":{$regex:req.params.key}}
            ]
        }
    )
    res.send(data);
}
const schoolID=async(req,res)=>
{
    try{
        const {id:ID}=req.params
        const school=await schoolModel.findOne({_id:ID})
        if(!school){
            return res.status(404).json({msg:`No School with id : ${ID}`})
        }
        res.status(200).json({school})
    }catch(error)
    {
         res.send(500).json({msg: error})
    }   
}
const schoolDelete=async (req,res)=>{
    try{
       const {id:ID}=req.params;
       const schools=await schoolModel.findOneAndDelete({_id:ID});
       if(!schools)
       {
       return res.status(404).json({msg:`No school with id:${ID}`})
       }
       res.status(200).json({schools})
    }catch(error)
    {
      res.send(500).json({msg:error})
    }
   
}
const schoolUpdate=async (req,res)=>{
    try{
        const {id:ID}=req.params
       const data=await schoolModel.findOneAndUpdate({_id:ID},req.body,{
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
const schoolGet=async(req,res)=>{
    try{
         const data=await schoolModel.find({})
         res.status(200).json({data})
    }catch(error)
    {
        res.status(500).json({msg:error})
    }
    res.send('all items')
}
module.exports=
{
    schoolPost,
    schoolPagination,
    schoolSearch,
    schoolID,
    schoolDelete,
    schoolUpdate,
    schoolGet,
};