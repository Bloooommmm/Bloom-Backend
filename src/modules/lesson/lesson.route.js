import express from 'express';
import { lessonController } from '../controllers/lesson.controller';

const router = express.Router();

router.post('/', lessonController.create);
router.get('/', lessonController.getAll);
router.get('/:slug', lessonController.getBySlug);
router.patch('/:id', lessonController.update);
router.delete('/:id', lessonController.delete);

module.exports = router;