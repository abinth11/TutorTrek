import Category from '../models/category';
import { CategoryInterface } from '@src/types/category';
import { Types } from 'mongoose';
const { ObjectId } = Types;

export const categoryRepositoryMongodb = () => {
  const addCategory = async(category:CategoryInterface) => {
    const newCategory = new Category(category);
    await newCategory.save();
  };

  const getCategoryById=async(categoryId:string)=>{
    const category:CategoryInterface|null = await Category.findOne({_id:new ObjectId(categoryId) })
    return category

  }

  const getAllCategory =async ()=>{
    const categories:CategoryInterface[]|null = await Category.find({})
    return categories
  }

  return {
    addCategory,
    getCategoryById,
    getAllCategory
  }
};

export type CategoryRepoMongodbInterface = typeof categoryRepositoryMongodb
