import express from 'express';
import {UserCrude} from '../controllers';
import testMidd from '../middleware/auth';

const router = express.Router();

 router.get('/api/v1/users', UserCrude.getUser);
router.post('/api/v1/users/signup', UserCrude.createUser);
 router.post('/api/v1/users/signin',  UserCrude.signIn);

export default router;
