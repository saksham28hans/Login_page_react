
const mongoose = require("mongoose");
const mongoURI = 'mongodb://localhost:27017/megaminds';
const Role = require("./models/roles");
const connect_to_mongo = ()=>{
    mongoose.connect(process.env.MONGODB_URI || mongoURI,()=>{
        console.log("Connected to database successfully");
        initial()
    });
}
function initial()
  {
      Role.estimatedDocumentCount((err,count)=>{
          if(!err && count === 0){
              new Role({
                  name: "student"
              }).save(err=>{
                  if(err)
                  console.log("Error occured");
                  else
                  console.log("Added student to role collection");
              })
              new Role({
                name: "teacher"
            }).save(err=>{
                if(err)
                console.log("Error occured");
                else
                console.log("Added teacher to role collection");
            })
            new Role({
                name: "admin"
            }).save(err=>{
                if(err)
                console.log("Error occured");
                else
                console.log("Added admin to role collection");
            })
          }
      })
  }
module.exports = connect_to_mongo;
