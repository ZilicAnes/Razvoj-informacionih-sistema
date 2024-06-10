const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Listing = sequelize.define('Listing', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    type: {
        type: DataTypes.ENUM('admin', 'user')
    },
    listing_id: {
        type: DataTypes.STRING
    },
    listing_title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    street: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    postal_code: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    token: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'listings'
});

module.exports = Listing;