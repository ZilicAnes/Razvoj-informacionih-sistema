import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jwtDecode } from 'jwt-decode';

import img1 from '../assets/1.jpg';
import img2E from '../assets/2E.jpeg';
import img3e from '../assets/3e.jpg';
import img4e from '../assets/4e.jpg';
import img5e from '../assets/5e.webp';
import img6 from '../assets/6.jpg';

const barbers = [
    {
        id: 1,
        name: 'John Doe',
        image: img1,
        description: 'Experienced barber with 10 years in the industry.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        image: img2E,
        description: 'Specialist in modern haircuts and styles.'
    },
    {
        id: 3,
        name: 'Mike Johnson',
        image: img3e,
        description: 'Expert in classic cuts and beard trimming.'
    },
    {
        id: 4,
        name: 'Emily Davis',
        image: img4e,
        description: 'Talented stylist known for creative hair designs.'
    },
    {
        id: 5,
        name: 'Chris Brown',
        image: img5e,
        description: 'Professional barber with a passion for perfection.'
    },
    {
        id: 6,
        name: 'Sarah Wilson',
        image: img6,
        description: 'Skilled in all types of haircuts and customer service.'
    }
];

function BarberDetail() {
    const { id } = useParams();
    const barber = barbers.find(barber => barber.id === parseInt(id));
    const [selectedDate, setSelectedDate] = useState(new Date());

    const authToken = localStorage.getItem('token');
    let userId = null;
    let username = '';

    if (authToken) {
        const decodedToken = jwtDecode(authToken);
        userId = decodedToken.id;
        username = decodedToken.username;
    }

    const handleReservation = async () => {
        try {
            const response = await fetch('http://localhost:3001/reserve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    listingId: barber.id,
                    bookingId: `booking-${Date.now()}`, // Generate a unique bookingId
                    bookingDate: selectedDate,
                    bookingStart: selectedDate,
                    bookingEnd: new Date(selectedDate.getTime() + 3600000), // Example: 1 hour later
                    username: username,
                    userId: userId
                }),
            });
            if (response.ok) {
                alert('Reservation successful!');
            } else {
                alert('Failed to make reservation.');
            }
        } catch (error) {
            console.error('Error making reservation:', error);
            alert('Failed to make reservation.');
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col md={12}>
                    <Image src={barber.image} alt={barber.name} fluid />
                </Col>
                <Col md={12} className='center'>
                    <h2>{barber.name}</h2>
                    <p className='white'>{barber.description}</p>
                    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
                    <Button className="mt-3" onClick={handleReservation}>Rezervisi</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default BarberDetail;
