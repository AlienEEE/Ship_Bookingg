const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')

const Driver = sequelize.define(
    'Driver',
    {
        name: {
            field: 'driver_name',
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        sname: {
            field: 'driver_sname',
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        phone: {
            field: 'driver_phone',
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        short: {
            field: 'drive_short',
            type: DataTypes.STRING(3),
            allowNull: false,
        },
    },
    {
        tableName: 'drivers',
    }
)

module.exports = Driver
