import express, {RequestHandler} from 'express';
import authMiddleware from "../middleware/AuthMiddleware";
import {bookControllerPostgres, bookControllerMongo} from "../controllers/BookController";
const router = express.Router();


router.post('/add', authMiddleware as RequestHandler, bookControllerPostgres.create, bookControllerMongo.create)
router.get('/:id', authMiddleware as RequestHandler, bookControllerPostgres.getOne, bookControllerMongo.getOne)
router.get('/', authMiddleware as RequestHandler, bookControllerPostgres.getAll, bookControllerMongo.getAll)
router.delete('/:id', authMiddleware as RequestHandler, bookControllerPostgres.delete, bookControllerMongo.delete)

export default router