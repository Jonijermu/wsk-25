import express from 'express';
import {
  deleteCat,
  getCat,
  getCatById,
  postCat,
  putCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
import createThumbnail from "../../middlewares.js";

const catRouter = express.Router();

const upload = multer({dest: 'uploads/c'});

catRouter.route('/').get(getCat).post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

// TODO: Implement this route
//catRouter.route('/owner/:id').get();

export default catRouter;
