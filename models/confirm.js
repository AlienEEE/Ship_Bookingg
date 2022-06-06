const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')
const Confirm = sequelize.define(
    'Confirm',
    {
        status: {
            field: 'status_confirm',
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: 'ยังไม่มีการออกเรือ',
        },
        sailing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        booking_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'confirms',
    }
)
module.exports = Confirm
