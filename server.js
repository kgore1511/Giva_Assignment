const express=require('express');
const app=express();
const dbConfig=require('./config/db.config');
const covid=require('./model/covid')
const redis=require('redis');

dbConfig.authenticate().then(()=> {
    console.log("Connected to postgre server")
}).catch(err=> {
    console.log(err);
})

// Redis Connection
const redisClient=redis.createClient();
redisClient.connect().then(()=> {
    console.log("redis connected");
}).catch(err=> {
    console.log(err)
})

app.get('/search', async (req,res) => {
    var searchByKeyword=req.query.searchquery;
    try{
    var data=await redisClient.get(searchByKeyword)
    
        if(JSON.parse(data)!=null) {
            res.status(200).json(JSON.parse(data));
        }
         else {
            var covidData=await covid.findAll({
                where: {
                    State: searchByKeyword 
                }
            })
            await redisClient.set(searchByKeyword, JSON.stringify(covidData));
          res.status(200).json(covidData);
        
        }
    }catch(err) {
        console.log(err)
    }
})
app.listen(5000,()=>{
    console.log("server started at port 5000")
})