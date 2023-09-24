import express, {RequestHandler} from 'express';
import bookController from "../controllers/BookController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import authRedisMiddleware from "../middleware/AuthRedisMiddleware";
const router = express.Router();

router.post('/add', authRedisMiddleware, bookController.create)
router.get('/:id', authRedisMiddleware, bookController.getOne)
router.get('/', authRedisMiddleware, bookController.getAll)
router.delete('/:id', authRedisMiddleware, bookController.delete)

export default router