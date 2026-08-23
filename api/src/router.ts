import { Router } from 'express';
import { authMiddleware } from './middlewares/auth.middleware.js';
import countriesController from './modules/countries/countries.controller.js';
import visitorsController from './modules/visitors/visitors.controller.js';

const router: Router = Router();

router.post('/countries', authMiddleware, countriesController.create);
router.get('/countries', countriesController.listAll);
router.patch('/countries/:country_id', authMiddleware, countriesController.update);
router.delete('/countries/:country_id', authMiddleware, countriesController.delete);

router.post('/visitors', authMiddleware, visitorsController.create);
router.get('/visitors', visitorsController.listAll);

export default router;
