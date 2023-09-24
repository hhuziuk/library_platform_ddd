import express, {RequestHandler} from 'express';
import publisherController from "../controllers/PublisherController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
import authRedisMiddleware from "../middleware/AuthRedisMiddleware";
const router = express.Router();

router.post('/add', authRedisMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.create)
router.get('/:id', authRedisMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getOne)
router.get('/', authRedisMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getAll)
router.delete('/:id', authRedisMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.delete)

export default router