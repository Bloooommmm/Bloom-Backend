export class LessonController {
  constructor(lessonService) {
    this.lessonService = lessonService;
  }

  getByUnitId = async (req, res, next) => {
    try {
      const { unitId } = req.params;
      const data = await this.lessonService.getLessonsByUnitId(unitId);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.lessonService.getLessonDetail(req.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}