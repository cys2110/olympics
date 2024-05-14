const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize, models) => {
    class NOC extends Model {
        static associate () {
            const { Edition, Competitor } = models
            NOC.hasMany(Edition)
            NOC.hasMany(Competitor)
        }
    }
    NOC.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ioc: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        iso: DataTypes.STRING(2)
    },
    {
        sequelize,
        modelName: 'NOC',
        timestamps: false
    })

    return NOC
}