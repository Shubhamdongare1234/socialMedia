const mongoose=require('mongoose');
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{
        type: String
    },
    age:{
        type: Number
    },
    following:{
        type:String
    },
    password:{
        typre:String
    },
    
},
{
    timestamps:true
})
const user=mongoose.model('user',userSchema)
module.exports=user;
