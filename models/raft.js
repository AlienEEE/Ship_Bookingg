const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')

const Raft = sequelize.define(
    'Raft',
    {
        name: {
            field: 'raft_name',
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        img: {
            field: 'raft_img',
            type: DataTypes.TEXT,
            allowNull: false,
        },
        des: {
            field: 'raft_des',
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: 'rafts',
    }
)
module.exports = Raft
