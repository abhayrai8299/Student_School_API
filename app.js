require('dotenv').config()
const express=require('express');
const app=express();

//Database 
const connectDB=require('./db/connect')

//middleware
const notFoundMiddleware=require('./middleware/not-found');
const errorMiddleware=require('./middleware/error-handler');

//EJS
app.set('view engine','ejs');
//routing
const schoolRoutes=require("./routes/schoolRoutes");
const studentRoutes=require("./routes/studentRoutes");

app.use(express.json())

//EJS IMPLEMENTATION
app.get("/demo/:name",function(req,res)
{
    res.render('demo',{name:req.params.name})
})
//use of Routes
app.use('/',schoolRoutes);
app.use('/',studentRoutes)

app.use(notFoundMiddleware)
app.use(errorMiddleware)
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