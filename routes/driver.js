const { Router } = require('express')
const router = Router()
const {
  getDriver,
  getDrivers,
  addDriver,
  editDriver,
  deleteDriver
} = require('../controllers/driver')

router.get('/', getDrivers)
router.get('/:id', getDriver)
router.post('/', addDriver)
router.put('/', editDriver)
router.delete('/:id', deleteDriver)

module.exports = router
