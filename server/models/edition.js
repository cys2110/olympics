const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class Edition extends Model {
        static associate () {
            const { NOC, Sport, Competitor } = models
            Edition.belongsTo(NOC)
            Edition.belongsToMany(Sport, {through: 'EditionSports'})
            Edition.hasMany(Competitor)
        }
    }
    Edition.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        season: {
            type: DataTypes.ENUM('Summer', 'Winter'),
            allowNull: false
        },
        year: DataTypes.INTEGER,
        number: DataTypes.STRING,
        start_date: DataTypes.DATEONLY,
        end_date: DataTypes.DATEONLY
    },
    {
        sequelize,
        modelName: 'Edition',
        timestamps: false
    })

    return Edition
}