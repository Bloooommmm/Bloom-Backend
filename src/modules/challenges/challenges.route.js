import { Router } from 'express';
import { ChallengeService } from './challenge.service.js';
import { ChallengeController } from './challenge.controller.js';

const router = Router({ mergeParams: true });

const challengeService = new ChallengeService();
const challengeController = new ChallengeController(challengeService);

router.get('/', challengeController.getByLessonId);

router.post('/:challengeId/check', challengeController.submitAnswer);

export default router;