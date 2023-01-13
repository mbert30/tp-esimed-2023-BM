const { Sequelize , DataTypes } = require('sequelize')
const {sequelize} = require("./sqlite.db.js")

exports.Utilisateur = sequelize.define('Utilisateur', {
    id:{primaryKey: true, type: DataTypes.STRING},
    firstName:{allowNull: false, type: DataTypes.STRING},
    lastName: {allowNull: false, type: DataTypes.STRING},
    password: {allowNull: false, type: DataTypes.STRING}
});

sequelize.sync();