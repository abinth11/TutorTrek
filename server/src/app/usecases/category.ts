import HttpStatusCodes from '../../constants/HttpStatusCodes';
import AppError from '../../utils/appError';
import { CategoryInterface } from '../../types/category';
import { CategoryDbInterface } from '../repositories/categoryDbRepository';

export const addCategoryU = async (
  category: CategoryInterface,
  categoryDbRepository: ReturnType<CategoryDbInterface>
) => {
  if (!category) {
    throw new AppError(
      'Please provide valid data',
      HttpStatusCodes.BAD_REQUEST
    );
  }

  await categoryDbRepository.addCategory(category);
};

export const getCategoryByIdU = async (
  categoryId: string,
  categoryDbRepository: ReturnType<CategoryDbInterface>
) => {
  if (!categoryId) {
    throw new AppError(
      'Please provide valid category id',
      HttpStatusCodes.BAD_REQUEST
    );
  }

  const category = await categoryDbRepository.getCategoryById(categoryId);
  return category;
};

export const getAllCategoryU = async (
  categoryDbRepository: ReturnType<CategoryDbInterface>
) => {
  const allCategories = await categoryDbRepository.getAllCategory();
  return allCategories;
};

export const editCategoryU = async (
  categoryId: string,
  categoryInfo: { name: string; description: string },
  categoryDbRepository: ReturnType<CategoryDbInterface>
) => {
  if (!categoryId) {
    throw new AppError(
      'Please provide valid category id',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  if (!categoryInfo) {
    throw new AppError(
      'Please provide valid data for editing a category',
      HttpStatusCodes.BAD_REQUEST
    );
  }
  await categoryDbRepository.editCategory(categoryId, categoryInfo);
};
