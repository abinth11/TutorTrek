import {
  addCategoryU,
  getAllCategoryU,
  getCategoryByIdU
} from '../../app/usecases/category';
import { CategoryDbInterface } from '../../app/repositories/categoryDbRepository';
import { CategoryRepoMongodbInterface } from '../../frameworks/database/mongodb/repositories/categoryRepoMongoDb';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import { CategoryInterface } from '../../types/category';

const categoryController = (
  categoryDbRepository: CategoryDbInterface,
  categoryDbRepositoryImpl: CategoryRepoMongodbInterface
) => {
  const dbRepositoryCategory = categoryDbRepository(categoryDbRepositoryImpl());

  const addCategory = asyncHandler(async (req: Request, res: Response) => {
    const category: CategoryInterface = req.body;
    await addCategoryU(category, dbRepositoryCategory);
    res.status(200).json({
      status: 'success',
      message: 'Successfully added a new category',
      data: null
    });
  });

  const getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const categoryId: string = req.params.categoryId;
    const category = await getCategoryByIdU(categoryId, dbRepositoryCategory);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved a category by id',
      data: category
    });
  });

  const getAllCategory = asyncHandler(async (req: Request, res: Response) => {
    const categories = await getAllCategoryU(dbRepositoryCategory);
    res.status(200).json({
      status: 'success',
      message: 'Successfully retrieved all categories',
      data: categories
    });
  });

  return {
    addCategory,
    getCategoryById,
    getAllCategory
  };
};

export default categoryController;
