const { User, Package, Booking, Response } = require('../models')
const Upload = require('./upload')
const { Op } = require('sequelize')
async function getBooking(req, res) {
    const booking = await Booking.findByPk(req.params.id)
    if (booking === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'
        return res.status(404).json(Response)
    }
    const user = await User.findByPk(booking.userId)
    const package = await Package.findByPk(booking.package_id)
    Response.status = 'success'
    Response.data = {
        id: booking.id,
        price: booking.price,
        value: booking.value,
        travel_date: booking.travel_date,
        travelback_date: booking.travelback_date,
        payment: booking.payment,
        status: booking.status,
        user: {
            id: user.id,
            name: user.name,
            sname: user.sname,
            phone: user.phone,
            username: user.username,
            password: user.password,
        },
        package: {
            id: package.id,
            name: package.name,
            price: package.price,
            value: package.value,
            img: package.img,
            des: package.des,
        },
    }
    return res.status(200).json(Response)
}

async function getBookings(req, res) {
    const { startOfDay, endOfDay } = req.body
    let bookings
    if (typeof startOfDay === 'undefined') {
        bookings = await Booking.findAll()
    } else {
        bookings = await Booking.findAll({
            where: {
                travel_date: {
                    [Op.between]: [startOfDay, endOfDay],
                },
            },
        })
    }
    if (bookings === null) {
        Response.status = 'fail'
        Response.data = 'Not found'
        return res.status(404).json(Response)
    }
    let ArrayBooking = []
    for (const i of bookings) {
        const user = await User.findByPk(i.user_id)
        const package = await Package.findByPk(i.package_id)
        Response.status = 'success'
        Response.data = {
            id: i.id,
            price: i.price,
            value: i.value,
            travel_date: i.travel_date.toLocaleString('th-TH'),
            travelback_date: new Date(
                Date.parse(i.travelback_date)
            ).toLocaleDateString('th-TH'),
            payment: i.payment,
            status: i.status,
            user: {
                id: user.id,
                name: user.name,
                sname: user.sname,
                phone: user.phone,
                username: user.username,
                password: user.password,
            },
            package: {
                id: package.id,
                name: package.name,
                price: package.price,
                value: package.value,
                img: package.img,
                des: package.des,
            },
        }
        ArrayBooking.push(Response.data)
    }
    return res.status(200).json(ArrayBooking)
}

async function addBooking(req, res) {
    const {
        value,
        price,
        travel_date,
        travelback_date,
        status,
        payment,
        package_id,
        user_id,
    } = req.body
    try {
        const booking = await Booking.create({
            value: value,
            price: price,
            travel_date: travel_date,
            travelback_date: travelback_date,
            payment: payment,
            status: status,
            package_id: package_id,
            user_id: user_id,
        })
        Response.status = 'success'
        Response.data = booking.dataValues

        res.status(200).send(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors
        return res.status(400).json(Response)
    }
}

async function editBooking(req, res) {
    const { status, id } = req.body
    const file = req.file
    let booking
    try {
        if (file == null) {
            booking = await Booking.update(
                {
                    status: status,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
        } else {
            const payment = await Upload(file)
            booking = await Booking.update(
                {
                    status: status,
                    payment: payment,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
        }

        Response.status = 'success'
        Response.data = booking

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors[0]

        return res.status(400).json(Response)
    }
}

async function deleteBooking(req, res) {
    const booking = await Booking.findByPk(req.params.id)
    if (booking === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'
        return res.status(404).json(Response)
    } else {
        await Booking.destroy({
            where: {
                id: req.params.id,
            },
        })
        res.status(204).send()
    }
}

module.exports = {
    getBooking,
    getBookings,
    addBooking,
    editBooking,
    deleteBooking,
}
