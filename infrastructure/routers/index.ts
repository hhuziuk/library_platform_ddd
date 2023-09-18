import express, {RequestHandler} from 'express';
import userRouter from "./UserRouter";
import bookRouter from "./BookRouter";
import publisherRouter from "./PublisherRouter";
import typeRouter from "./TypeRouter";
const router = express.Router();

router.use('/user', userRouter)
router.use('/book',  bookRouter)
router.use('/publisher', publisherRouter)
router.use('/type', typeRouter)

export default router