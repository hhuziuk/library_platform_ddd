import express, {RequestHandler} from 'express';
import userController from "../controllers/UserController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import roleRedisMiddleware from "../middleware/RoleRedisMiddleware";
import authMiddleware from "../middleware/AuthTokenMiddleware";
const router = express.Router();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, roleRedisMiddleware('ADMIN'), userController.getUsers)
router.delete('/delete', authMiddleware, userController.delete)

export default router