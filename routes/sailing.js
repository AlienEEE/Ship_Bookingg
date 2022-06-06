const { Router } = require('express')
const router = Router()
const {
  getSailing,
  getSailings,
  addSailing,
  editSailing,
  deleteSailing
} = require('../controllers/sailing')

router.get('/:id', getSailing)
router.get('/', getSailings)
router.post('/', addSailing)
router.put('/', editSailing)
router.delete('/:id', deleteSailing)

module.exports = router
