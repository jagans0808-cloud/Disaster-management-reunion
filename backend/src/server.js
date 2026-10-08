import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import personRoutes from './routes/personRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Mandatory for Render deployment

// Allowed origins for CORS (Development + Netlify production)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    // Allow listed origins or any Netlify subdomain in production
    if (
      allowedOrigins.includes(origin) ||
      /\.netlify\.app$/.test(origin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Request logger for development
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint (Required for Render and monitoring)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'REUNITE API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Mount Routes
app.use('/api/persons', personRoutes);
app.use('/api/reports', reportRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    service: 'REUNITE Disaster Reunification Backend API',
    version: '1.0.0',
    documentation: {
      health: '/api/health',
      persons: '/api/persons',
      reports: '/api/reports'
    }
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Reusable Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Listen on 0.0.0.0 for Render compatibility
app.listen(PORT, HOST, () => {
  console.log(`===============================================`);
  console.log(`🚀 REUNITE Backend Server running on http://${HOST}:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`👥 Persons API:  http://localhost:${PORT}/api/persons`);
  console.log(`📋 Reports API:  http://localhost:${PORT}/api/reports`);
  console.log(`===============================================`);
});

export default app;

