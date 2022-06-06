const { Router } = require('express')
const router = Router()
const {
    getReview,
    getReviews,
    addReview,
    deleteReview,
} = require('../controllers/review')
const multer = require('multer')
const formData = multer({
    storage: multer.memoryStorage(),
})

router.get('/:id', getReview)
router.get('/', getReviews)
router.post('/', formData.single('file'), addReview)
router.delete('/:id', deleteReview)

module.exports = router
