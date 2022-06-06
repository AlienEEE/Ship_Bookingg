const { Router } = require('express')
const router = Router()
const {
    getConfirm,
    getConfirms,
    addConfirm,
    editConfirm,
} = require('../controllers/confirm')

router.get('/:id', getConfirm)
router.get('/', getConfirms)
router.post('/', addConfirm)
router.put('/', editConfirm)

module.exports = router
