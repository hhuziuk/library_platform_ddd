import express, {RequestHandler} from 'express';
import userRouter from "./UserRouter";
import bookRouter from "./BookRouter";
import publisherRouter from "./PublisherRouter";
import typeRouter from "./TypeRouter";
import authMiddleware from "../middleware/AuthTokenMiddleware";
const router = express.Router();

router.use('/user', userRouter)
router.use('/book', authMiddleware, bookRouter)
router.use('/publisher', authMiddleware, publisherRouter)
router.use('/type', authMiddleware, typeRouter)

export default router