const dotenv = require('dotenv')
dotenv.config()
const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.Athlete = require('./athlete')(sequelize, db)
db.Competitor = require('./competitor')(sequelize, db)
db.Edition = require('./edition')(sequelize, db)
db.Event = require('./event')(sequelize, db)
db.NOC = require('./noc')(sequelize, db)
db.Sport = require('./sport')(sequelize, db)

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db