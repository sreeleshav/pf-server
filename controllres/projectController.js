const projects =require('../Models/projectModel')

exports.addproject=async (req,res)=>{
    try{
        const image=req.file.filename
        const {title, description, languages, github, demo}=req.body
        const userid=req.payload
        if(!title || !description || !languages || !github || !demo || !image){
            res.status(406).json("Invalid Data!!")
        }
        else{
            const existingproject = await projects.findOne({userid,github})
            if(existingproject){
                console.log(existingproject)
                res.status(406).json("project Already Exist!!")
            }
            else{
                console.log(userid)
                const newproject = new projects({
                    title,description,languages,github,demo,image,userid
                })
                await newproject.save()
                res.status(200).json(newproject)
            }
        }
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

exports.getproject=async(req,res)=>{
    try{
        const userid=req.payload
        const projectlist=await projects.find({userid})
        res.status(200).json(projectlist)

    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

exports.deleteproject=async(req,res)=>{
    try{
        const {pid}=req.params
        const pro =await projects.findByIdAndDelete(pid)
        res.status(200).json(pro)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }

}

exports.updateproject=async(req,res)=>{
    try{
        const {pid}=req.params
        const userid=req.payload
        if(req.file){
            var image =req.file.filename
            var{title,description,languages,github,demo}=req.body
        }
        else{
            var{title,description,languages,github,demo,image}=req.body
        }
        const pro=await projects.findByIdAndUpdate(pid,
            {title,description,languages,github,demo,image})
        res.status(200).json(pro)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

exports.allprojects=async(req,res)=>{
    try{
        const result=await projects.find()
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

exports.serachProjects=async(req,res)=>{
    try{
        const keyword = req.query.search
        const result=await projects.find({languages :{$regex :keyword,$options:'i' } })
        // console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(400).json(err)
    }
}

