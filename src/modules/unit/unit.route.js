import { Router } from 'express';
import { UnitService } from './unit.service.js';
import { UnitController } from './unit.controller.js';

const router = Router();

const unitService = new UnitService();
const unitController = new UnitController(unitService);

router.get('/', unitController.getAll);
router.get('/:id', unitController.getById);

export default router;