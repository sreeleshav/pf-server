const express=require('express')
const userController=require('../controllres/userController')
const projectController=require('../controllres/projectController')

const jwtMiddleware=require('../Middlewares/jwtMiddlewares')
const multerConfig=require('../Middlewares/multerMiddleware')


const route=express.Router()

route.post('/reg',userController.userRegister)
route.post('/log',userController.userLogin)
route.put('/updationprofile',jwtMiddleware,multerConfig.single('profile'),userController.userUpdation)

route.post('/addproject',jwtMiddleware,multerConfig.single('image'),projectController.addproject)
route.get('/getproject',jwtMiddleware,projectController.getproject)
route.delete('/deletepro/:pid',jwtMiddleware,projectController.deleteproject)
route.put('/updatepro/:pid',jwtMiddleware,multerConfig.single('image'),projectController.updateproject)
route.get('/allprojects',projectController.allprojects)
route.get('/search',projectController.serachProjects)




module.exports=route