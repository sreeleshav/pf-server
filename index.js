require('dotenv').config()


const express=require('express')
const cors=require('cors')
const router=require('./Router/router')
require('./Connection/db')
// const jwt=require('./Middlewares/jwtMiddlewares')



const pfserver=express()

pfserver.use(cors())
pfserver.use(express.json())
// pfserver.use(jwt)
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))

const PORT=3000 || process.env.PORT

pfserver.listen(PORT,()=>{
    console.log("Server running at:",PORT)
})

pfserver.get('/',(req,res)=>{
    res.send("<h1>Request is Hit</h1>")
})

pfserver.get('/',(req,res)=>{
    res.send("<h1>Request is Hit</h1>")
})