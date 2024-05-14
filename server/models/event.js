const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class Event extends Model {
        static associate () {
            const { Sport, Competitor } = models
            Event.belongsTo(Sport)
            Event.hasMany(Competitor)
        }
    }
    Event.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Event',
        timestamps: false
    })

    return Event
}