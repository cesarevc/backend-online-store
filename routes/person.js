import routerx from 'express-promise-router';
import personController from '../controllers/PersonController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyUser, personController.add);
router.get('/query', auth.verifyUser, personController.query);
router.get('/list', auth.verifyUser, personController.list);
router.get('/listClients', auth.verifyUser, personController.listClients);
router.get('/listProviders', auth.verifyUser, personController.listProviders);
router.put('/update', auth.verifyUser, personController.update);
router.delete('/remove', auth.verifyUser, personController.remove);
router.put('/activate', auth.verifyUser, personController.activate);
router.put('/deactivate', auth.verifyUser, personController.deactivate);

export default router;
