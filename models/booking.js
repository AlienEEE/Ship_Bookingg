const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')

const Booking = sequelize.define(
    'Booking',
    {
        value: {
            field: 'booking_value',
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        price: {
            field: 'booking_price',
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        travel_date: {
            field: 'travel_date',
            type: DataTypes.DATE,
            allowNull: true,
        },
        travelback_date: {
            field: 'travelback_date',
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        payment: {
            field: 'booking_payment',
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            field: 'booking_status',
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: 'ยังไม่ทำการชำระเงิน',
        },
        package_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'bookings',
    }
)
module.exports = Booking
