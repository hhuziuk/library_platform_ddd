import express, {RequestHandler} from 'express';
import typeController from "../controllers/TypeController";
import roleRedisMiddleware from "../middleware/RoleRedisMiddleware";
const router = express.Router();

router.post('/add', roleRedisMiddleware('ADMIN'), typeController.create)
router.get('/:id', roleRedisMiddleware('ADMIN'), typeController.getOne)
router.get('/', roleRedisMiddleware('ADMIN'), typeController.getAll)
router.delete('/:id', roleRedisMiddleware('ADMIN'), typeController.delete)

export default router

// as RequestHandler