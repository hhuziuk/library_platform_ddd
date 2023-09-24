import express, {RequestHandler} from 'express';
import publisherController from "../controllers/PublisherController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
import authRedisMiddleware from "../middleware/AuthRedisMiddleware";
const router = express.Router();

router.post('/add', authRedisMiddleware, roleMiddleware('ADMIN'), publisherController.create)
router.get('/:id', authRedisMiddleware, roleMiddleware('ADMIN'), publisherController.getOne)
router.get('/', authRedisMiddleware, roleMiddleware('ADMIN'), publisherController.getAll)
router.delete('/:id', authRedisMiddleware, roleMiddleware('ADMIN'), publisherController.delete)

export default router