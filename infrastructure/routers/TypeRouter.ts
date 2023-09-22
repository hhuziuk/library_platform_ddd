import express, {RequestHandler} from 'express';
import typeController from "../controllers/TypeController";
import authTokenMiddleware from "../middleware/AuthTokenMiddleware";
import roleMiddleware from "../middleware/RoleMiddleware";
const router = express.Router();

router.post('/add', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.create)
router.get('/:id', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.getOne)
router.get('/', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.getAll)
router.delete('/:id', authTokenMiddleware as RequestHandler, roleMiddleware('ADMIN'), typeController.delete)

export default router