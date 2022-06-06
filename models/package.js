const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')
const Package = sequelize.define(
    'Package',
    {
        name: {
            field: 'package_name',
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        price: {
            field: 'package_price',
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        value: {
            field: 'package_value',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img: {
            field: 'package_img',
            type: DataTypes.TEXT,
            allowNull: false,
        },
        des: {
            field: 'package_des',
            type: DataTypes.TEXT,
            allowNull: false,
        },
        raft_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'packages',
    }
)
module.exports = Package
