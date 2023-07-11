import express from 'express';
import categoryController from '../../../adapters/controllers/categoryController';
import { categoryDbInterface } from '../../../app/repositories/categoryDbRepository';
import { categoryRepositoryMongodb } from '../../../frameworks/database/mongodb/repositories/categoryRepoMongoDb';

const categoryRouter = () => {
  const router = express.Router();

  const controller = categoryController(
    categoryDbInterface,
    categoryRepositoryMongodb
  );

  router.post('/add-category', controller.addCategory);

  router.get('/get-category/:categoryId', controller.getCategoryById);

  router.get('/get-all-categories', controller.getAllCategory);

  router.put('/edit-category/:categoryId',controller.editCategory)

  return router;
};

export default categoryRouter;
