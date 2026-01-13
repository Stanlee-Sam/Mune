const express = require('express')
const router = express.Router()
const {addClinic, getClinics, updateClinic, deleteClinic} = require('../controllers/clinicController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

router.post('/', authMiddleware('VET'), addClinic)
router.get('/', getClinics)
router.put('/:id', authMiddleware('VET'), updateClinic)
router.delete('/:id', authMiddleware('VET'), deleteClinic)

module.exports = router