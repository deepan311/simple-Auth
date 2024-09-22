import express from 'express';
import { register } from 'module';
import { delUser, login, registerUsers, userData } from '../Controllers/registerController';
import { verifyUser } from '../Middleware/VerifyUser';

const router = express.Router();

router.post('/register',registerUsers)
router.get('/',verifyUser,userData)
router.get('/login',login)
router.delete('/delete',verifyUser,delUser)


export default router;
