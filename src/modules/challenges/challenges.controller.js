export class ChallengeController {
  constructor(challengeService) {
    this.challengeService = challengeService;
  }

  getByLessonId = async (req, res, next) => {
    try {
      const { lessonId } = req.params;
      const data = await this.challengeService.getChallengesByLessonId(lessonId);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  submitAnswer = async (req, res, next) => {
    try {
      const { challengeId } = req.params;
      const { selected_option_id } = req.body;

      const result = await this.challengeService.checkAnswer(
        challengeId,
        selected_option_id
      );

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };
}