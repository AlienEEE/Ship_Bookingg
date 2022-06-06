const { Boat, Driver, Sailing, Response } = require('../models')

async function getSailing(req, res) {
    const sailing = await Sailing.findByPk(req.params.id)
    if (sailing === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'
        return res.status(404).json(Response)
    }
    const driver = await Driver.findByPk(sailing.driver_id)
    const boat = await Boat.findByPk(sailing.boat_id)
    Response.status = 'success'
    Response.data = {
        id: sailing.id,
        name: sailing.sailing_name,
        driver: {
            id: driver.id,
            name: driver.name,
            sname: driver.sname,
            phone: driver.phone,
            short: driver.short,
        },
        boat: {
            id: boat.id,
            name: boat.name,
            img: boat.img,
            type: boat.type,
            value: boat.value,
        },
    }
    return res.status(200).json(Response)
}

async function getSailings(req, res) {
    const sailings = await Sailing.findAll()
    if (sailings === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'
        return res.status(404).json(Response)
    }
    const ArraySailing = []
    for (const i of sailings) {
        const driver = await Driver.findByPk(i.driver_id)
        const boat = await Boat.findByPk(i.boat_id)
        Response.status = 'success'
        Response.data = {
            id: i.id,
            name: i.name,
            driver: {
                id: driver.id,
                name: driver.name,
                sname: driver.sname,
                phone: driver.phone,
                short: driver.short,
            },
            boat: {
                id: boat.id,
                name: boat.name,
                img: boat.img,
                type: boat.type,
                value: boat.value,
            },
        }
        ArraySailing.push(Response.data)
    }
    return res.status(200).json(ArraySailing)
}
async function addSailing(req, res) {
    const { name, driver_id, boat_id } = req.body
    try {
        const sailing = await Sailing.create({
            name: name,
            driver_id: driver_id,
            boat_id: boat_id,
        })
        Response.status = 'success'
        Response.data = sailing.dataValues
        res.status(200).send(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors
        return res.status(400).json(Response)
    }
}

async function editSailing(req, res) {
    const { name, driverId, boatId, id } = req.body
    try {
        const sailing = await Sailing.update(
            {
                name: name,
                driver_id: driverId,
                boat_id: boatId,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        Response.status = 'success'
        Response.data = sailing
        res.send(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors
        return res.status(400).json(Response)
    }
}

async function deleteSailing(req, res) {
    const sailing = await Sailing.findByPk(req.params.id)
    if (sailing === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'
        return res.status(404).json(Response)
    } else {
        await Sailing.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.status(204).send()
    }
}

module.exports = {
    getSailing,
    getSailings,
    addSailing,
    editSailing,
    deleteSailing,
}
