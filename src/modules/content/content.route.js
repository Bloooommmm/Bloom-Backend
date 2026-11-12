import { Router } from 'express';
import { ContentService } from './content.service.js';
import { ContentController } from './content.controller.js';

const router = Router({ mergeParams: true });

const contentService = new ContentService();
const contentController = new ContentController(contentService);

router.get('/', contentController.getByLessonId);

export default router;