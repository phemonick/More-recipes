import express from 'express';
import { Favorite, UserController } from '../controllers';
import Auth from '../middleware/auth';

const userRouter = express.Router();

userRouter.get('/api/v1/users', UserController.getUser);
userRouter.post('/api/v1/users/signup', UserController.createUser);
userRouter.post('/api/v1/users/signin', UserController.signIn);
userRouter.post('/api/v1/users/:userId/recipes', Auth.verifyToken, Favorite.addFavorite);
userRouter.get('/api/v1/users/:userId/recipes', Auth.verifyToken, Favorite.getFavorite);

export default userRouter;
