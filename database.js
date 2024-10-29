const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite' // This file will be created in your project folder
});


// Define User model
const User = sequelize.define('User', {
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    sequence: {
        type: DataTypes.JSON, // Store sequences as JSON
    },
    password: {
        type: DataTypes.STRING, // Optional, if you want to keep a password field
    }
});

// Sync the model with the database
const syncDatabase = async () => {
    await sequelize.sync();
};

syncDatabase();

module.exports = { User }; // Export User model
