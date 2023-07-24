import { CloudServiceImpl } from "../../frameworks/services/s3CloudService";

export const cloudServiceInterface = (service:ReturnType<CloudServiceImpl>) =>{
   
    const upload = async(file:Express.Multer.File) => await service.uploadFile(file)

    const uploadAndGetUrl = async (file:Express.Multer.File) => await service.uploadAndGetUrl(file)

    const getFile = async(fileKey:string) =>await service.getFile(fileKey)

    const getVideoStream = async(fileKey:string)=>await service.getVideoStream(fileKey)

    const getCloudFrontUrl = async (fileKey:string)=> await service.getCloudFrontUrl(fileKey)

    const removeFile = async(fileKey:string)=> await service.removeFile(fileKey)

    return {
        upload,
        uploadAndGetUrl,
        getFile,
        getVideoStream,
        getCloudFrontUrl,
        removeFile
    }
}

export type CloudServiceInterface = typeof cloudServiceInterface