const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class Competitor extends Model {
        static associate () {
            const { Event, Edition, Athlete, NOC } = models
            Competitor.belongsTo(Event)
            Competitor.belongsTo(Edition)
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
        round: {
            type: DataTypes.STRING,
            allowNull: false
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