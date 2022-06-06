const { Sequelize } = require('sequelize')
const { ENV } = require('../config')

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASS, {
    host: ENV.DB_HOST,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            ca: ENV.DB_CA.replace(/\\n/g, '\n'),
        },
    },
    port: ENV.DB_PORT,
    logging: false,
})
async function syncAll(force = false) {
    await sequelize.sync({ force: force })
}
async function syncOne(model, force = false) {
    await model.sync({ force: force })
}
async function syncOneToMany(one, many, fk) {
    await one.hasMany(many, {
        foreignKey: {
            name: fk,
            field: fk,
            allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
    })
}

module.exports = { sequelize, syncAll, syncOne, syncOneToMany }
