const { ENV } = require('../config')
const jwt = require('jsonwebtoken')
const { User, Response } = require('../models')

async function login(req, res) {
    const user = await User.findOne({ where: { username: req.body.username } })
    if (user === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        if (req.body.password == user.password) {
            let userdata = {
                username: user.username,
            }
            let Token = signin(userdata, ENV.SECRETKEY)

            Response.status = 'success'
            Response.data = {
                accessToken: Token,
                id: user.id,
                username: user.username,
            }
            res.status(200).json(Response)
        } else {
            Response.status = 'fail'
            Response.data = 'Not found!'

            return res.status(404).json(Response)
        }
    }
}

async function verify(req, res, next) {
    let accessToken = getTokenFrom(req)
    if (!accessToken) {
        return req.status(403).json({ message: 'กรุณาล็อกอิน' })
    }
    try {
        jwt.verify(accessToken, ENV.SECRETKEY, (err, authData) => {
            if (err) return res.status(401).json({ message: 'กรุณาล็อกอิน' })
        })
        next()
    } catch (err) {
        return res.status(401).json({ message: 'ล็อกอินผิดพลาด' })
    }
}

function signin(data, secretkey) {
    try {
        return jwt.sign(data, secretkey, { expiresIn: '1d' })
    } catch (e) {
        return res.status(401).json(e)
    }
}
const getTokenFrom = (request) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

module.exports = { login, verify }
