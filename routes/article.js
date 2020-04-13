import routerx from 'express-promise-router';
import articleController from '../controllers/ArticleController';
import auth from '../middlewares/auth';

const router = routerx();

router.post('/add', auth.verifyManager,  articleController.add);
router.get('/query', auth.verifyManager, articleController.query);
router.get('/queryCode', auth.verifyUser, articleController.queryCode);
router.get('/list', auth.verifyManager, articleController.list);
router.put('/update', auth.verifyManager, articleController.update);
router.delete('/remove', auth.verifyManager, articleController.remove);
router.put('/activate', auth.verifyManager, articleController.activate);
router.put('/deactivate', auth.verifyManager, articleController.deactivate);

export default router;
