const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class Competitor extends Model {
        static associate () {
            const { Competition, Athlete, NOC } = models
            Competitor.belongsTo(Competition)
            Competitor.belongsTo(Athlete)
            Competitor.belongsTo(NOC)
        }
    }
    Competitor.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        medal: DataTypes.ENUM('Gold', 'Silver', 'Bronze')
    },
    {
        sequelize,
        modelName: 'Competitor',
        timestamps: false
    })

    return Competitor
}