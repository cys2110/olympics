const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class Athlete extends Model {
        static associate () {
            const { Competitor } = models
            Athlete.hasMany(Competitor)
        }
    }
    Athlete.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: DataTypes.STRING,
        last_name: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        sex: DataTypes.ENUM('Male', 'Female'),
        dob: DataTypes.DATEONLY
    },
    {
        sequelize,
        modelName: 'Athlete',
        timestamps: false
    })

    return Athlete
}