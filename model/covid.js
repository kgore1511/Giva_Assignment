const Sequelize=require('sequelize');
const db=require('../config/db.config')
var covid=db.define('covid', {
    Date: {
        type: Sequelize.DATEONLY
    },
    State: {
        type: Sequelize.STRING
    },
    fips: {
        type: Sequelize.INTEGER
    },
    Cases: {
        type: Sequelize.INTEGER
    },
    Deaths: {
        type: Sequelize.INTEGER
    }
},
    {
    timestamps: false
    }
)

covid.sync({force:false}).then(function() {
    console.log("Table created");
})
module.exports=covid