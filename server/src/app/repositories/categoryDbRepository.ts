import { CategoryRepoMongodbInterface } from "../../frameworks/database/mongodb/repositories/categoryRepoMongoDb";
import { CategoryInterface } from "../../types/category";

export const categoryDbInterface = (repository:ReturnType<CategoryRepoMongodbInterface>)=>{
    const addCategory =async(category:CategoryInterface)=>await repository.addCategory(category)
    
    const getCategoryById = async(categoryId:string)=> await repository.getCategoryById(categoryId)

    const getAllCategory = async ()=> await repository.getAllCategory()
    
    return {
        addCategory,
        getCategoryById,
        getAllCategory
    }

}

export type CategoryDbInterface = typeof categoryDbInterface