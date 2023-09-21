import express, {RequestHandler} from 'express';
import userController from "../controllers/UserController";
import authMiddleware from "../middleware/AuthMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
const router = express.Router();

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), userController.getUsers)
router.delete('/delete', authMiddleware as RequestHandler, userController.delete)

export default router