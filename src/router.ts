import { Router } from 'express';
import { authMiddleware } from './middlewares/auth.middleware.js';
import countriesController from './modules/countries/countries.controller.js';

const router: Router = Router();

router.post('/countries', authMiddleware, countriesController.create);
router.get('/countries', countriesController.listAll);
router.patch('/countries/:country_id', authMiddleware, countriesController.update);
router.delete('/countries/:country_id', authMiddleware, countriesController.delete);

export default router;
