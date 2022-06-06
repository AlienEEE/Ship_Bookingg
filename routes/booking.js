const { Router } = require('express')
const router = Router()
const {
    getBooking,
    getBookings,
    addBooking,
    editBooking,
    deleteBooking,
} = require('../controllers/booking')
const multer = require('multer')
const formData = multer({
    storage: multer.memoryStorage(),
})

router.get('/:id', getBooking)
router.get('/', getBookings)
router.post('/', addBooking)
router.put('/', formData.single('file'), editBooking)
router.delete('/:id', deleteBooking)

module.exports = router
