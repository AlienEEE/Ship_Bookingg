const { Booking, Sailing, Confirm, Response } = require('../models')
async function getConfirm(req, res) {
    const confirm = await Confirm.findByPk(req.params.id)
    if (confirm === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'
        return res.status(404).json(Response)
    }
    const sailing = await Sailing.findByPk(confirm.sailing_id)
    const booking = await Booking.findByPk(confirm.booking_id)
    Response.status = 'success'
    Response.data = {
        id: confirm.id,
        status: confirm.status,

        booking: {
            id: booking.id,
            price: booking.price,
            value: booking.value,
            travelback_date: booking.travelback_date,
            travel_date: booking.travel_date,
        },
        sailing: {
            id: sailing.id,
            name: sailing.name,
            sailing_date: sailing.sailing_date,
        },
    }
    return res.status(200).json(Response)
}

async function getConfirms(req, res) {
    const confirms = await Confirm.findAll()
    if (confirms === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'
        return res.status(404).json(Response)
    }
    const ArrayConfirm = []
    for (const i of confirms) {
        const booking = await Booking.findByPk(i.booking_id)
        const sailing = await Sailing.findByPk(i.sailing_id)
        Response.status = 'success'
        Response.data = {
            id: i.id,
            status: i.status,

            booking: {
                id: booking.id,
                price: booking.price,
                value: booking.value,
                travelback_date: booking.travelback_date,
                travel_date: booking.travel_date.toLocaleString('th-TH'),
            },
            sailing: {
                id: sailing.id,
                name: sailing.name,
                sailing_date: sailing.sailing_date,
            },
        }
        ArrayConfirm.push(Response.data)
    }
    return res.status(200).json(ArrayConfirm)
}

async function addConfirm(req, res) {
    const { status, booking_id, sailing_id, price } = req.body
    try {
        const confirm = await Confirm.create({
            status: status,
            booking_id: booking_id,
            sailing_id: sailing_id,
        })
        Response.status = 'success'
        Response.data = confirm.dataValues
        res.status(200).send(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors
        return res.status(400).json(Response)
    }
}

async function editConfirm(req, res) {
    const { status, id } = req.body
    try {
        const confirm = await Confirm.update(
            {
                status: status,
            },
            {
                where: {
                    id: id,
                },
            }
        )
        Response.status = 'success'
        Response.data = confirm

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors[0]

        return res.status(400).json(Response)
    }
}

module.exports = {
    getConfirm,
    getConfirms,
    addConfirm,
    editConfirm,
}
