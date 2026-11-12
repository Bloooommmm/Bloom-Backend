import { aiService } from '../services/ai.service';

const aiController = {
  async getInsight(req, res) {
    try {
      const { mood, symptoms, cyclePhase, extraNotes } = req.body;

      if (!mood || !symptoms) {
        return res.status(400).json({
          success: false,
          message: 'Field mood dan symptoms wajib diisi',
        });
      }

      const insight = await aiService.generateCycleInsight({
        mood,
        symptoms,
        cyclePhase,
        extraNotes,
      });

      res.json({
        success: true,
        data: insight,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Gagal menghasilkan penjelasan AI: ' + error.message,
      });
    }
  },
};

module.exports = aiController;