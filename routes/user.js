import routerx from 'express-promise-router';
import userController from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyAdministrator, userController.add);
router.get('/query', auth.verifyAdministrator, userController.query);
router.get('/list', auth.verifyAdministrator, userController.list);
router.put('/update', auth.verifyAdministrator, userController.update);
router.delete('/remove', auth.verifyAdministrator, userController.remove);
router.put('/activate', auth.verifyAdministrator, userController.activate);
router.put('/deactivate', auth.verifyAdministrator, userController.deactivate);
router.post('/login', userController.login);

export default router;
