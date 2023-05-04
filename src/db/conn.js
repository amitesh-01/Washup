const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/washup_db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("db connected");
}).catch((e)=>{
    console.log(e);
});