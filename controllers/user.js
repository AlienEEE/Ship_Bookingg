const { User, Response } = require('../models')

async function getUser(req, res) {
    const user = await User.findByPk(req.params.id)

    if (user === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        Response.status = 'success'
        Response.data = user

        res.status(200).json(Response)
    }
}

async function getUsers(req, res) {
    const users = await User.findAll()
    Response.status = 'success'
    Response.data = users

    res.status(200).json(Response)
}

async function addUser(req, res) {
    const { name, sname, phone, username, password } = req.body
    const user = await User.findOne({ where: { username: username } })
    if (user != null) {
        Response.status = 'fail'
        return res.status(403).json(Response)
    }
    try {
        const user = await User.create({
            name: name,
            sname: sname,
            phone: phone,
            username: username,
            password: password,
        })
        Response.status = 'success'
        Response.data = user.dataValues

        res.status(201).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors[0]

        return res.status(400).json(Response)
    }
}

async function editUser(req, res) {
    const { name, sname, phone, role, username, password, id } = req.body

    try {
        const user = await User.update(
            {
                name: name,
                sname: sname,
                phone: phone,
                role: role,
                username: username,
                password: password,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        Response.status = 'success'
        Response.data = user.dataValues

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors[0]

        return res.status(400).json(Response)
    }
}

async function deleteUser(req, res) {
    const user = await User.findByPk(req.params.id)

    if (user === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        await User.destroy({
            where: {
                id: req.params.id,
            },
        })
            .then(() => {
                return res.status(204).end()
            })
            .catch(() => {
                return res.status(502).send('ไม่สามารถลบชื่อผู้ใช้ได้')
            })

        res.status(204).end()
    }
}

module.exports = { getUser, getUsers, addUser, editUser, deleteUser }
