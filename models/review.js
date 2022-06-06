const { sequelize } = require('./database')
const { DataTypes } = require('sequelize')

const Review = sequelize.define(
    'Review',
    {
        detail: {
            field: 'review_detail',
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rank: {
            field: 'review_rank',
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        img: {
            field: 'review_img',
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: 'reviews',
    }
)
module.exports = Review
