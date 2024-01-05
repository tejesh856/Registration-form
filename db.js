const mongoose = require('mongoose');
const mongourl='mongodb+srv://tejesh:VijPad6972@cluster0.ycbrzpc.mongodb.net/register?retryWrites=true&w=majority';
const mongodb=async ()=>{
    await mongoose.connect(mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(async()=>{
        console.log('MongoDB connected successfully');
    }).catch((err)=>{console.log(err)})
}
module.exports=mongodb;