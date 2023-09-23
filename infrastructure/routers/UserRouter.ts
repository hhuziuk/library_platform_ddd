import express, {RequestHandler} from 'express';
import userController from "../controllers/UserController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
import authRedisMiddleware from "../middleware/AuthRedisMiddleware";
const router = express.Router();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authRedisMiddleware as RequestHandler, roleMiddleware('ADMIN'), userController.getUsers)
router.delete('/delete', authRedisMiddleware as RequestHandler, userController.delete)

export default router