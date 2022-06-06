const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')
const Sailing = sequelize.define(
    'Sailing',
    {
        name: {
            field: 'sailing_name',
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        driver_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        boat_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'sailings',
    }
)
module.exports = Sailing
