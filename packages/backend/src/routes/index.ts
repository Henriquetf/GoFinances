import { Router } from 'express';

import transactionRouter from './transaction.routes';

const router = Router();

router.use('/transactions', transactionRouter);

export default router;
