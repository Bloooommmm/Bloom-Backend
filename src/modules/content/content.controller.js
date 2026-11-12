export class ContentController {
  constructor(contentService) {
    this.contentService = contentService;
  }

  getByLessonId = async (req, res, next) => {
    try {
      const { lessonId } = req.params;
      const data = await this.contentService.getContentsByLessonId(lessonId);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}