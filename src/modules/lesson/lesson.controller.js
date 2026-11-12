import { lessonService } from '../services/lesson.service';

const lessonController = {
  async create(req, res) {
    try {
      const lesson = await lessonService.createLesson(req.body);
      res.status(201).json({ success: true, data: lesson });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const showAll = req.query.all === 'true';
      const lessons = await lessonService.getAllLessons(!showAll);
      res.json({ success: true, data: lessons });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getBySlug(req, res) {
    try {
      const lesson = await lessonService.getLessonBySlug(req.params.slug);
      if (!lesson) return res.status(404).json({ success: false, message: 'Lesson tidak ditemukan' });
      res.json({ success: true, data: lesson });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async update(req, res) {
    try {
      const lesson = await lessonService.updateLesson(req.params.id, req.body);
      res.json({ success: true, data: lesson });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async delete(req, res) {
    try {
      await lessonService.deleteLesson(req.params.id);
      res.json({ success: true, message: 'Lesson berhasil dihapus' });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};

module.exports = lessonController;