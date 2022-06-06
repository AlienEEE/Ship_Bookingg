const { Router } = require('express')
const router = Router()
const {
    getUser,
    getUsers,
    addUser,
    editUser,
    deleteUser,
} = require('../controllers/user')

router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/', addUser)
router.put('/', editUser)
router.delete('/:id', deleteUser)

module.exports = router
