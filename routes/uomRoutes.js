import express from 'express'
import { createUoM, deleteUoM, updateUoM, getAllUoM } from "../controllers/unitOfMeasureController.js"


const router = express.Router()
router.route('/').post(createUoM).get(getAllUoM)
// router.route('/stats').get(showStats)
router.route('/:id').delete(deleteUoM).patch(updateUoM)

export default router