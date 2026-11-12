import { prisma } from '../../db/prisma.js';

export class ChallengeService {
  async getChallengesByLessonId(lessonId) {
    const lesson = await prisma.msLesson.findUnique({
      where: { lesson_id: lessonId },
    });

    if (!lesson) {
      const error = new Error('Lesson tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    return await prisma.msChallenge.findMany({
      where: { lesson_id: lessonId },
      orderBy: { order_index: 'asc' },
      select: {
        challenge_id: true,
        lesson_id: true,
        challenge_type: true,
        question: true,
        question_media: true,
        option: true,
        order_index: true,
      },
    });
  }

  async checkAnswer(challengeId, selectedOptionId) {
    if (!selectedOptionId) {
      const error = new Error('selected_option_id wajib diisi');
      error.statusCode = 400;
      throw error;
    }

    const challenge = await prisma.msChallenge.findUnique({
      where: { challenge_id: challengeId },
      include: {
        key: true, 
      },
    });

    if (!challenge) {
      const error = new Error('Challenge tidak ditemukan');
      error.statusCode = 404;
      throw error;
    }

    if (!challenge.key) {
      const error = new Error('Kunci jawaban untuk soal ini belum diatur');
      error.statusCode = 500;
      throw error;
    }

    const correctOptionId = challenge.key.answer_key?.correct_option_id;
    const isCorrect = selectedOptionId === correctOptionId;

    return {
      challenge_id: challenge.challenge_id,
      is_correct: isCorrect,
      selected_option_id: selectedOptionId,
      correct_option_id: correctOptionId,
      explanation: challenge.explanation,
    };
  }
}