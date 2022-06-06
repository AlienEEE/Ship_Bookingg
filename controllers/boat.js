const { Boat, Response } = require('../models')
const Upload = require('./upload')

async function getBoat(req, res) {
    const boat = await Boat.findByPk(req.params.id)

    if (boat === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        Response.status = 'success'
        Response.data = boat

        res.status(200).json(Response)
    }
}

async function getBoats(req, res) {
    const boats = await Boat.findAll()

    Response.status = 'success'
    Response.data = boats

    res.status(200).json(Response)
}

async function addBoat(req, res) {
    const { name, type, value } = req.body
    const file = req.file

    try {
        const img = await Upload(file)
        const boat = await Boat.create({
            name: name,
            img: img,
            type: type,
            value: value,
        })

        Response.status = 'success'
        Response.data = boat.dataValues

        res.status(201).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors

        return res.status(400).json(Response)
    }
}

async function editBoat(req, res) {
    const { name, type, value, id } = req.body
    const file = req.file
    let boat
    try {
        if (file == null) {
            boat = await Boat.update(
                {
                    name: name,
                    type: type,
                    value: value,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
        } else {
            const img = await Upload(file)
            boat = await Boat.update(
                {
                    name: name,
                    img: img,
                    type: type,
                    value: value,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
        }

        Response.status = 'success'
        Response.data = boat

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors[0]

        return res.status(400).json(Response)
    }
}
async function deleteBoat(req, res) {
    const boat = await Boat.findByPk(req.params.id)

    if (boat === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        await Boat.destroy({
            where: {
                id: req.params.id,
            },
        })

        res.status(204).end()
    }
}

module.exports = {
    getBoat,
    getBoats,
    addBoat,
    editBoat,
    deleteBoat,
}
