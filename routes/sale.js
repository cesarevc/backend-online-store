import routerx from 'express-promise-router';
import saleConstroller from '../controllers/SaleConstroller';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifySalesman, saleConstroller.add);
router.get('/query', auth.verifySalesman, saleConstroller.query);
router.get('/list', auth.verifySalesman, saleConstroller.list);
router.get('/lastTwelveMonths', auth.verifyUser, saleConstroller.lastTwelveMonths);

// router.put('/update', auth.verifySalesman, saleConstroller.update);
// router.delete('/remove', auth.verifySalesman, saleConstroller.remove);
router.put('/activate', auth.verifySalesman, saleConstroller.activate);
router.put('/deactivate', auth.verifySalesman, saleConstroller.deactivate);

export default router;
