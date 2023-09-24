import express, {RequestHandler} from 'express';
import typeController from "../controllers/TypeController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
import authRedisMiddleware from "../middleware/AuthRedisMiddleware";
const router = express.Router();

router.post('/add', authRedisMiddleware, roleMiddleware('ADMIN'), typeController.create)
router.get('/:id', authRedisMiddleware, roleMiddleware('ADMIN'), typeController.getOne)
router.get('/', authRedisMiddleware, roleMiddleware('ADMIN'), typeController.getAll)
router.delete('/:id', authRedisMiddleware, roleMiddleware('ADMIN'), typeController.delete)

export default router

// as RequestHandler