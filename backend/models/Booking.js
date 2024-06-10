const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Listing = require('./Listing');

const Booking = sequelize.define('Booking', {
    bookingId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    bookingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    bookingStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    bookingEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    timestamps: false,
});

Booking.belongsTo(Listing, { foreignKey: 'listingId' });

module.exports = Booking;
