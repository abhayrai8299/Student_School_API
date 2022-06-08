const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("Connection is Successful")
  }).catch((e)=>{
    console.log("No connection")
  })
}

module.exports = connectDB
