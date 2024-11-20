
const users=require('../Models/userModels')

const jwt=require('jsonwebtoken')




exports.userRegister=async(req,res)=>{
    try{
        
    const {email,username,password}=req.body
    if(!email || !username || !password){
        res.status(406).json("Invalid Data!!")
    }
    else{
        const newUser=new users({email,username,password,profile:"",linkedin:"",github:""})
        await newUser.save()
        res.status(200).json(newUser)
    }

    }

    catch(err){
        console.log(err)
        res.status(400).json(err)
    }

}

exports.userLogin=async(req,res)=>{
    // console.log(req.body)
    try{
        const {email,password}=req.body
        const existing=await users.findOne({email,password})
        if(existing){
            console.log(existing)
            const token=jwt.sign({userId:existing._id},process.env.SECRET_KEY)
            console.log({token,uname:existing.username})
            res.status(200).json({token,uname:existing.username,profile:existing.profile,linkedin:existing.linkedin,github:existing.github})
            console.log(res)
        }
        else{
            res.status(406).json("Invalid Email/Password")
        }
    }
    catch{
        console.log(err)
        res.status(400).json(err)
    }
}

exports.userUpdation=async(req,res)=>{
    try{
        const userId=req.payload
        console.log(req.file)
        if(req.file){
            var profile=req.file.filename
            var {username,github,linkedin}=req.body
        }else{
            var{username,github,linkedin,profile}=req.body
        }

        const result=await users.findByIdAndUpdate(userId,{username,github,linkedin,profile})
        res.status(200).json("Updated")
}
catch{
    console.log(err)
    res.status(400).json(err)
}

}

