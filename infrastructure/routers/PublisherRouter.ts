import express, {RequestHandler} from 'express';
import publisherController from "../controllers/PublisherController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
const router = express.Router();

router.post('/add', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.create)
router.get('/:id', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getOne)
router.get('/', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.getAll)
router.delete('/:id', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), publisherController.delete)

export default router