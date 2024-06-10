import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminReservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3001/reservations', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReservations(response.data);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <div className='centerdiv'>
            <h2>Reservations</h2>
            <ul>
                {reservations.map((reservation, index) => (
                    <li key={index} className='white'>
                        Barber: {reservation.barberName}, Date: {new Date(reservation.date).toLocaleString()}, User: {reservation.User.firstName} {reservation.User.lastName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminReservations;
