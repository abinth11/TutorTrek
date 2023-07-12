import {
  getCategoriesService,
  getCategoryByIdService,
  addCategoryService,
  editCategoryByIdService,
} from "../services/category";

import END_POINTS from "../../constants/endpoints";

export const addCategory = (categoryInfo: {
  name: string;
  description: string;
}) => {
  return addCategoryService(END_POINTS.ADD_CATEGORY, categoryInfo);
};

export const getAllCategories = () => {
  return getCategoriesService(END_POINTS.GET_ALL_CATEGORY);
};

export const getCategory = (categoryId: string) => {
  return getCategoryByIdService(END_POINTS.GET_CATEGORY_BY_ID, categoryId);
};

export const editCategory = (
  categoryId: string,
  categoryInfo: {
    name?: string;
    description?: string;
  }
) => {
  return editCategoryByIdService(
    END_POINTS.EDIT_CATEGORY,
    categoryId,
    categoryInfo
  );
};
