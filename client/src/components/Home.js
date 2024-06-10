import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import img1 from '../assets/1.jpg';
import img2E from '../assets/2E.jpeg';
import img3e from '../assets/3e.jpg';
import img4e from '../assets/4e.jpg';
import img5e from '../assets/5e.webp';
import img6 from '../assets/6.jpg';

function Home() {
    const navigate = useNavigate();

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

    const handleCardClick = (id) => {
        navigate(`/barber/${id}`);
    };

    return (
        <Container>
            <h2>Dobrodošli na našu stranicu</h2>
            <Row>
                {barbers.map((barber, index) => (
                    <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                        <Card onClick={() => handleCardClick(barber.id)} style={{ cursor: 'pointer' }}>
                            <Card.Img variant="top" src={barber.image} />
                            <Card.Body>
                                <Card.Title>{barber.name}</Card.Title>
                                <Card.Text>{barber.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Home;
