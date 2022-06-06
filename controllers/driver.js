const { Driver, Response } = require('../models')

async function getDriver(req, res) {
    const driver = await Driver.findByPk(req.params.id)

    if (driver === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        Response.status = 'success'
        Response.data = driver

        res.status(200).json(Response)
    }
}

async function getDrivers(req, res) {
    const drivers = await Driver.findAll()
    Response.status = 'success'
    Response.data = drivers

    res.status(200).json(Response)
}

async function addDriver(req, res) {
    const { name, sname, phone, short } = req.body
    try {
        const driver = await Driver.create({
            name: name,
            sname: sname,
            phone: phone,
            short: short,
        })
        Response.status = 'success'
        Response.data = driver.dataValues
        res.status(201).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors[0]

        return res.status(400).json(Response)
    }
}

async function editDriver(req, res) {
    const { name, sname, phone, id, short } = req.body
    try {
        const driver = await Driver.update(
            {
                name: name,
                sname: sname,
                phone: phone,
                short: short,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        Response.status = 'success'
        Response.data = driver.dataValues

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors[0]

        return res.status(400).json(Response)
    }
}

async function deleteDriver(req, res) {
    const driver = await Driver.findByPk(req.params.id)
    if (driver === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        await Driver.destroy({
            where: {
                id: req.params.id,
            },
        })

        res.status(204).end()
    }
}

module.exports = { getDriver, getDrivers, addDriver, editDriver, deleteDriver }
