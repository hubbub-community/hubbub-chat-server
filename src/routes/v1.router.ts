/**
 * v1 REST Router
 * @module api/v1.router
 */

import { Router } from 'express';
import c from '../controllers/v1.controllers';

// Create a router instance
const router: Router = Router();

// Import middleware
import modelFinder from '../middleware/model-finder';

// Dynamically evaluate the model
router.param('model', modelFinder);

// Declare routes
router.get('/', c.rootHandler);
router.get(`/api/v1/:model`, c.getRecords);
router.get(`/api/v1/:model/:id`, c.getRecords);
router.post(`/api/v1/:model`, c.createRecord);
router.put(`/api/v1/:model/:id`, c.updateRecord);
router.patch(`/api/v1/:model/:id`, c.patchRecord);
router.delete(`/api/v1/:model/:id`, c.deleteRecord);

export default router;
