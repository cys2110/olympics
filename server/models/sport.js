const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class Sport extends Model {
        static associate () {
            const { Event, Edition } = models
            Sport.hasMany(Event)
            Sport.belongsToMany(Edition, {through: 'EditionSports'})
        }
    }
    Sport.init({
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
        modelName: 'Sport',
        timestamps: false
    })

    return Sport
}