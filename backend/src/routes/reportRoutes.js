import express from 'express';
import {
  getAllReports,
  getReportById,
  createReport
} from '../controllers/reportController.js';

const router = express.Router();

// GET /api/reports - Return all missing reports
router.get('/', getAllReports);

// GET /api/reports/:id - Return missing report by Report ID
router.get('/:id', getReportById);

// POST /api/reports - Create a missing report
router.post('/', createReport);

export default router;

