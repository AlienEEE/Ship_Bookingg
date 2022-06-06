const { Router } = require('express')
const router = Router()
const { login } = require('../controllers/login')

router.post('/', login)

module.exports = router
