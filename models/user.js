const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
    'User',
    {
        name: {
            field: 'name',
            type: DataTypes.STRING(20),
            allowNull: false
        },
        sname: {
            field: 'sname',
            type: DataTypes.STRING(20),
            allowNull: false
        },
        phone: {
            field: 'phone',
            type: DataTypes.STRING(10),
            allowNull: false
        },
        role: {
            field: 'role',
            type: DataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'C'
        },
        username: {
            field: 'username',
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password: {
            field: 'password',
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        tableName: 'users'
    }
)
module.exports = User
