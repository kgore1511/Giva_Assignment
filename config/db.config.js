const Sequelize=require('sequelize');
module.exports=new Sequelize("db","postgres","123456",{
        host: "localhost",
        dialect: "postgres",
        pool: {
            max:5,
            min:0,
            idle:10000
        }
    })