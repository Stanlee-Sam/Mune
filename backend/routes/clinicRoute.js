const express = require('express')
const router = express.Router()
const {addClinic, getClinics, updateClinic, deleteClinic} = require('../controllers/clinicController.js')
const authMiddleware = require('../middleware/authMiddleware.js')
const upload = require('../middleware/multerMiddleware.js')

router.post('/', authMiddleware('VET'), upload.single('image'), addClinic)
router.get('/', getClinics)
router.put('/:id', authMiddleware('VET'), updateClinic)
router.delete('/:id', authMiddleware('VET'), deleteClinic)

module.exports = router