const express=require('express');
var router=express.Router();
var bcrypt=require('bcrypt');
var {body,check,validationResult}=require('express-validator');

/// Create new user

const User = require('../model/model');
const Follow = require('../model/follow');
const { response } = require('../app');
router.post('/create',body('name').notEmpty().withMessage("enter the name of user"),
                         body('age').notEmpty().withMessage("enter the age of user"),
                           body('following').notEmpty().withMessage("enter the name to who are you following"),
                           body('password').notEmpty().withMessage("enter  the password"),async(req,res,next)=>{
                            try{
                                let errors=validationResult(req);
                                if(!errors.isEmpty()){
                                    return res.status(401).json({error:true,message:"found and errors"});
                                }else{
                                    let salt=await bcrypt.genSalt(10);
                                    let password=await bcrypt.hash(req.body.password,salt);
                                    let user=new User({
                                        name:req.body.name,
                                        age:req.body.age,
                                        following:req.body.following,
                                        password:password

                                    })
                                    user.save()
                                    .then(response=>{
                                        res.json({message:"user added successfully"})
                                    })
                                    .catch(error =>{
                                        message:"error occured"
                                    })



                                }
                            }catch(err){
                                res.send({error:true,message:"error in validation"});
                            }

                           });

      //// find a specific user by name


    router.get('/find/:name',(req,res,next)=>{
        let name=req.params.name;
        User.find({name})
        .then(response=>{
            res.json({
                response
            })
        })
        .catch(error=>{
            message:"an error occured"
        })
    });
 

    /// follow a user

    router.post('/follow',body('following').notEmpty().withMessage("enter the name who you wnat to follow"),
                          body('name').notEmpty().withMessage("enter the name of user"),
                                           (req,res,next)=>{
                                            let follow=new Follow({
                                                name:req.body.name,
                                                following:req.body.following

                                            })
                                            follow.save()
                                            .then(response=>{
                                                res.json({message:"user is followong"})
                                            })
                                            .catch(error=>{
                                                res.json({message:"error occured"})
                                            })

                                           });
/// list of followers


 router.get('/list/:name',(req,res,next)=>{
    let name=req.params.name;
    User.aggregate([
        {
            $lookup:
            {
                from:'Follow',
                localField:'name',
                foreignField:'name',
                as:'name'
            }
        }
    ])
    .then(response=>{
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({message:"error in join"})
    })
 });



                           module.exports=router;
