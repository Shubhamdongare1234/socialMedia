const mongoose=require('mongoose');
const Schema=mongoose.Schema

const follwSchema=new Schema({
    name:{
        type: String
    },
    following:{
        type:String
    }
    
},
{
    timestamps:true
})
const follow=mongoose.model('follow',follwSchema)
module.exports=follow;
