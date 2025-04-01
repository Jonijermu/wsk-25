import express from 'express';

import {
  getUser,
  getUserById,
  postUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(getUserById);


export default userRouter;
