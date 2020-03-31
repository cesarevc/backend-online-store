import routerx from 'express-promise-router';
import categoryController from '../controllers/CategoryController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyManager, categoryController.add);
router.get('/query', auth.verifyManager, categoryController.query);
router.get('/list', auth.verifyManager, categoryController.list);
router.put('/update', auth.verifyManager, categoryController.update);
router.delete('/remove', auth.verifyManager, categoryController.remove);
router.put('/activate', auth.verifyManager, categoryController.activate);
router.put('/deactivate', auth.verifyManager, categoryController.deactivate);

export default router;
