import express from 'express';
import {
  deleteCat,
  getCat,
  getCatById,
  postCat,
  putCat,
  getCatByOwnerId
} from '../controllers/cat-controller.js';

import {
  createThumbnail,
  authenticateToken,
  upload,
  validationErrors
} from "../../middlewares.js";
import {body} from "express-validator";

const catRouter = express.Router();

catRouter.route('/').get(getCat).post(
  upload.single('file'),
  body('cat_name').trim().isLength({min: 3, max: 10}).isAlphanumeric(),
  body('weight').trim().isNumeric(),
  body('owner').trim().isNumeric(),
  body('birthdate').trim().isDate(),
  validationErrors,
  createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(authenticateToken, putCat)
  .delete(authenticateToken,deleteCat);

catRouter.route('/owner/:id').get(getCatByOwnerId);

export default catRouter;
