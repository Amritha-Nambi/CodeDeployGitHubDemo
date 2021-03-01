const mongoose = require('mongoose')
//Comment added to check codedeploy
const dBConnection = async () =>{
    console.log('connecting to DB...')
    try {
        const connection = await mongoose.connect("mongodb://10.0.2.26:27017/sampledb",{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true, useFindAndModify:false })
        console.log('Connection state - ',connection.connection.readyState);

        
    } catch (error) {
        console.log("ERROR while connecting DB",error)
    }   
}

module.exports = dBConnection;
