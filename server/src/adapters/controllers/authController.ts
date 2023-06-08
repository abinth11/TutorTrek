import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { AuthService } from '../../frameworks/services/authService'
import { AuthServiceInterface } from '../../app/services/authServicesInterface'
import { StudentsDbInterface } from '../../app/repositories/studentDbRepository'
import { StudentRepositoryMongoDB } from '../../frameworks/database/mongodb/repositories/studentsRepoMongoDb'
import { studentLogin } from '../../app/usecases/auth/studentAuth'


const authController = (
    authServiceInterface: AuthServiceInterface,
    authServiceImpl: AuthService,
    studentDbRepository: StudentsDbInterface,
    studentDbRepositoryImpl : StudentRepositoryMongoDB,
    ) => {

    const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())


    const loginStudent = asyncHandler(async(req:Request,res:Response)=>{
        const {email,password}:{email:string,password:string} = req.body;
        const token = await studentLogin(email,password,dbRepositoryUser,authService)
        res.json({
            status:"success",
            message:"user verified",
            token
        })
    })


    return {
        loginStudent,
    }

}

export default authController
