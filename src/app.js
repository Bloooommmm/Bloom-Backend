import express from 'express';
import cors from 'cors';
import unitRoutes from './modules/unit/unit.route.js';
import lessonRoutes from './modules/lesson/lesson.route.js';
import contentRoutes from './modules/content/content.route.js';
import challengeRoutes from './modules/challenges/challenges.route.js';

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/v1/units', unitRoutes);
app.use('/api/v1/units/:unitId/lessons', lessonRoutes);
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/v1/lessons/:lessonId/contents', contentRoutes);
app.use('/api/v1/lessons/:lessonId/challenges', challengeRoutes);
app.use('/api/v1/challenges', challengeRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} tidak ditemukan`,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;