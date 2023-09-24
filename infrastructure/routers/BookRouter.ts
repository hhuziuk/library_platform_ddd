import express, {RequestHandler} from 'express';
import bookController from "../controllers/BookController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import authRedisMiddleware from "../middleware/AuthRedisMiddleware";
const router = express.Router();

router.post('/add', authRedisMiddleware as RequestHandler, bookController.create)
router.get('/:id', authRedisMiddleware as RequestHandler, bookController.getOne)
router.get('/', authRedisMiddleware as RequestHandler, bookController.getAll)
router.delete('/:id', authRedisMiddleware as RequestHandler, bookController.delete)

export default router