import express from 'express';
import {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  updatePersonStatus,
  reunitePerson,
  deletePerson
} from '../controllers/personController.js';

const router = express.Router();

// GET /api/persons - Return all persons
router.get('/', getAllPersons);

// GET /api/persons/:id - Return a person by Person ID
router.get('/:id', getPersonById);

// POST /api/persons - Create a person
router.post('/', createPerson);

// PUT /api/persons/:id - Update person details
router.put('/:id', updatePerson);

// PUT /api/persons/:id/status - Update status, location, and verification
router.put('/:id/status', updatePersonStatus);

// PUT /api/persons/:id/reunite - Mark person as safely reunited
router.put('/:id/reunite', reunitePerson);

// DELETE /api/persons/:id - Delete a person
router.delete('/:id', deletePerson);

export default router;

