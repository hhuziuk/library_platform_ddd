import express, {RequestHandler} from 'express';
import bookController from "../controllers/BookController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
const router = express.Router();

router.post('/add', authTokenMiddleware as RequestHandler, bookController.create)
router.get('/:id', authTokenMiddleware as RequestHandler, bookController.getOne)
router.get('/', authTokenMiddleware as RequestHandler, bookController.getAll)
router.delete('/:id', authTokenMiddleware as RequestHandler, bookController.delete)

export default router