const { Router } = require('express')
const router = Router()
const {
    getBoat,
    getBoats,
    addBoat,
    editBoat,
    deleteBoat,
} = require('../controllers/boat')
const multer = require('multer')
const formData = multer({
    storage: multer.memoryStorage(),
})

router.get('/', getBoats)
router.get('/:id', getBoat)
router.post('/', formData.single('file'), addBoat)
router.put('/', formData.single('file'), editBoat)
router.delete('/:id', deleteBoat)

module.exports = router
