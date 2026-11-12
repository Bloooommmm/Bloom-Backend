import { Router } from 'express';
import { LessonService } from './lesson.service.js';
import { LessonController } from './lesson.controller.js';

const router = Router({ mergeParams: true });

const lessonService = new LessonService();
const lessonController = new LessonController(lessonService);

router.get('/', lessonController.getByUnitId);
router.get('/:id', lessonController.getById);

export default router;