require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

const {
    Users,
    Rafts,
    Boats,
    Drivers,
    Packages,
    Bookings,
    Sailings,
    Reviews,
    Login,
    Confirms,
} = require('./routes')
const { ENV } = require('./config')
const {
    syncAll,
    syncOneToMany,
    // syncOneToOne,
    Raft,
    Package,
    Boat,
    Driver,
    Sailing,
    Booking,
    Review,
    User,
    Confirm,
} = require('./models')

async function startApp() {
    const app = express()

    app.use(cors())
    app.use(compression())
    app.use(helmet())
    app.use(express.json())

    app.use('/user', Users)
    app.use('/driver', Drivers)
    app.use('/boat', Boats)
    app.use('/raft', Rafts)
    app.use('/package', Packages)
    app.use('/booking', Bookings)
    app.use('/sailing', Sailings)
    app.use('/review', Reviews)
    app.use('/login', Login)
    app.use('/confirm', Confirms)

    await syncOneToMany(Raft, Package, 'raft_id')
    await syncOneToMany(Package, Booking, 'package_id')
    await syncOneToMany(User, Booking, 'user_id')
    await syncOneToMany(Driver, Sailing, 'driver_id')
    await syncOneToMany(Boat, Sailing, 'boat_id')
    await syncOneToMany(User, Review, 'user_id')
    await syncOneToMany(Booking, Confirm, 'booking_id')
    await syncOneToMany(Sailing, Confirm, 'sailing_id')

    await syncAll()

    try {
        app.listen(ENV.PORT)
        console.log(`Server is running on http://localhost:${ENV.PORT}`)
    } catch (error) {
        console.error(error)
    }
}

startApp()
