const { Router } = require('express')
const router = Router()
const {
    getRaft,
    getRafts,
    addRaft,
    editRaft,
    deleteRaft,
} = require('../controllers/raft')
const multer = require('multer')
const formData = multer({
    storage: multer.memoryStorage(),
})

router.get('/:id', getRaft)
router.get('/', getRafts)
router.post('/', formData.single('file'), addRaft)
router.put('/', formData.single('file'), editRaft)
router.delete('/:id', deleteRaft)

module.exports = router
