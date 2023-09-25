import express, {RequestHandler} from 'express';
import publisherController from "../controllers/PublisherController";
import roleRedisMiddleware from "../middleware/RoleRedisMiddleware";
const router = express.Router();

router.post('/add', roleRedisMiddleware('ADMIN'), publisherController.create)
router.get('/:id', roleRedisMiddleware('ADMIN'), publisherController.getOne)
router.get('/', roleRedisMiddleware('ADMIN'), publisherController.getAll)
router.delete('/:id', roleRedisMiddleware('ADMIN'), publisherController.delete)

export default router