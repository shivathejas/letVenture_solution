const express = require("express");
const os = require("os");
const connectDB = require("../config/db");
const Job = require("./models/Job");
const app = express();
const JOb = require('./models/Job');

app.use(express.static("dist"));
app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

app.get("/api/search",(req,res)=>{
  let params = req.query;
  var match ={ $match:{}}
  for(let key in params){
    if(key === "keyword"){
      match["$match"]['$or'] = [{postion: params[key]},{skill:params[key]}]
    }else{
      match["$match"][key] = params[key]
    }
  }
  JOb.aggregate([match,
    {$sort:{
      createdAt:-1
    }}
  ]).then(jobs => {
    res.status(200).send({
      data: jobs
    })

  })

})
// Connect Database
connectDB();
app.listen(4000, () => console.log(`Listening on port 4000!`));
