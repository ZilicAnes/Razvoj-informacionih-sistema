const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Listing = require('./Listing');

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    listingId: {
        type: DataTypes.INTEGER,
        references: {
            model: Listing,
            key: 'id'
        }
    },
    bookingId: {
        type: DataTypes.STRING
    },
    bookingDate: {
        type: DataTypes.DATE
    },
    bookingStart: {
        type: DataTypes.DATE
    },
    bookingEnd: {
        type: DataTypes.DATE
    },
    username: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'reservations'
});

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Listing.hasMany(Reservation, { foreignKey: 'listingId' });
Reservation.belongsTo(Listing, { foreignKey: 'listingId' });

module.exports = Reservation;
