const express=require('express');
const app=express();
const dbConfig=require('./config/db.config');
const covid=require('./model/covid')
const redis=require('redis');
const Sequelize=require('sequelize')
const Op=Sequelize.Op
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

// search state with similiar syntax
app.get('/searchState', async(req,res) => {
    var searchKeyword=req.query.searchquery || "";
    if(searchKeyword.length>0)searchKeyword=searchKeyword.charAt(0).toUpperCase() + searchKeyword.slice(1).toLowerCase();
    try {
        var states=await covid.findAll({
            attributes: [[Sequelize.fn('DISTINCT',Sequelize.col('State')),'state']],
            where: {
                State: {
                    [Op.startsWith]:searchKeyword.trim()
                }
            }
        })
        res.status(200).send(states)
    }catch(err) {
        console.log(err);
    }
})

// search by state name
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