const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')

const Boat = sequelize.define(
    'Boat',
    {
        name: {
            field: 'boat_name',
            type: DataTypes.STRING(3),
            allowNull: false,
        },
        img: {
            field: 'boat_img',
            type: DataTypes.TEXT,
            allowNull: true,
        },
        type: {
            field: 'boat_type',
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        value: {
            field: 'boat_value',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'boats',
    }
)
module.exports = Boat
