import express from 'express';
import cors from 'cors';
import userRoutes from 'modules/user/user.controller.js'
import lessonRoutes from 'modules/lesson/lesson.controller.js'
import aiRoutes from 'modules/ai/ai.controller.js';
const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/ai', aiRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} is not found`,
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