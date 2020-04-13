import routerx from 'express-promise-router';
import incomeController from '../controllers/IncomeController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyManager, incomeController.add);
router.get('/query', auth.verifyManager, incomeController.query);
router.get('/list', auth.verifyManager, incomeController.list);
router.get('/lastTwelveMonths', auth.verifyUser, incomeController.lastTwelveMonths);

// router.put('/update', auth.verifyManager, incomeController.update);
// router.delete('/remove', auth.verifyManager, incomeController.remove);
router.put('/activate', auth.verifyManager, incomeController.activate);
router.put('/deactivate', auth.verifyManager, incomeController.deactivate);

export default router;
