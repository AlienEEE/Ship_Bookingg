const { Router } = require('express')
const router = Router()
const {
    getPackage,
    getPackages,
    addPackage,
    editPackage,
    deletePackage,
} = require('../controllers/package')
const multer = require('multer')
const formData = multer({
    storage: multer.memoryStorage(),
})

router.get('/:id', getPackage)
router.get('/', getPackages)
router.post('/', formData.single('file'), addPackage)
router.put('/', formData.single('file'), editPackage)
router.delete('/:id', deletePackage)

module.exports = router
