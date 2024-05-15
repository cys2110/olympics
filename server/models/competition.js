const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class Competition extends Model {
        static associate () {
            const { Event, Edition, Competitor } = models
            Competition.belongsTo(Event)
            Competition.belongsTo(Edition)
            Competition.hasMany(Competitor)
        }
    }
    Competition.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        round: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sex: {
            type: DataTypes.ENUM('Men', 'Women'),
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Competition',
        timestamps: false
    })

    return Competition
}