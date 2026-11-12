export class UnitController {
  constructor(unitService) {
    this.unitService = unitService;
  }

  getAll = async (req, res, next) => {
    try {
      const data = await this.unitService.getAllUnits();
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const data = await this.unitService.getUnitDetail(req.params.id);
      res.status(200).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
}