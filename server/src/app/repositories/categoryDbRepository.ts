import { CategoryRepoMongodbInterface } from '../../frameworks/database/mongodb/repositories/categoryRepoMongoDb';
import { CategoryInterface } from '../../types/category';

export const categoryDbInterface = (
  repository: ReturnType<CategoryRepoMongodbInterface>
) => {
  const addCategory = async (category: CategoryInterface) =>
    await repository.addCategory(category);

  const getCategoryById = async (categoryId: string) =>
    await repository.getCategoryById(categoryId);

  const getAllCategory = async () => await repository.getAllCategory();

  const editCategory = async (
    categoryId: string,
    categoryInfo: { name: string; description: string }
  ) => await repository.editCategory(categoryId, categoryInfo);

  const getCourseCountByCategory = async ()=> await repository.getCourseCountByCategory()

  return {
    addCategory,
    getCategoryById,  
    getAllCategory,
    editCategory,
    getCourseCountByCategory
  };
};

export type CategoryDbInterface = typeof categoryDbInterface;
