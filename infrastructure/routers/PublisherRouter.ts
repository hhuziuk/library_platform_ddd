import express, {RequestHandler} from 'express';
import publisherController from "../controllers/PublisherController";
import authMiddleware from "../middleware/AuthMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
const router = express.Router();

router.post('/add', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.create)
router.get('/:id', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getOne)
router.get('/', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getAll)
router.delete('/:id', authMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.delete)

export default router