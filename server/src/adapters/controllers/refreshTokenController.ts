import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthService } from '../../frameworks/services/authService';
import { AuthServiceInterface } from '../../app/services/authServicesInterface';
import { RefreshTokenDbInterface } from '../../app/repositories/refreshTokenDBRepository';
import { RefreshTokenRepositoryMongoDb } from '../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb';
import { refreshTokenU } from '../../app/usecases/auth/refreshToken';

const refreshTokenController = (
  authServiceInterface: AuthServiceInterface,
  authServiceImpl:AuthService,
  refreshTokenDbRepository:RefreshTokenDbInterface,
  refreshTokenRepositoryImpl:RefreshTokenRepositoryMongoDb
) => {
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())


    const refreshToken = asyncHandler(async(req:Request,res:Response)=>{
        let refreshToken = req.body.refreshToken
        
        const response = await refreshTokenU(refreshToken,dbRepositoryRefreshToken,authService)
        res.status(200).json({
            status:'success',
            message:'Successfully refreshed token',
            accessToken:response
        })
    })

    return {
        refreshToken
    }
};

export default refreshTokenController