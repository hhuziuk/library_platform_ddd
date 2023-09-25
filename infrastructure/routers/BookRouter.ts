import express, {RequestHandler} from 'express';
import bookController from "../controllers/BookController";
const router = express.Router();

router.post('/add', bookController.create)
router.get('/:id', bookController.getOne)
router.get('/', bookController.getAll)
router.delete('/:id', bookController.delete)

export default router