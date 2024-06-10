import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/register', { username, firstName, lastName, password, email });
            navigate('/login');
        } catch (error) {
            console.error('Error registering', error);
        }
    };

    return (
        <div className='blue-wrapper'>
            <div className='big-wrapper'>
                <h2 className='border-right-2'>Registracija</h2>
                <div className='prijava-wrapper'>
                    <a href='/login' className='white'>
                        <p className='big'>Već imate račun? Prijavite se</p>
                    </a>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.3335 8H12.6668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 3.3335L12.6667 8.00016L8 12.6668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='form-wrapper'>
                <div className='input-wrapper'>
                    <div className='half'>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className='half'>
                        <label>Ime:</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                </div>

                <div className='full'>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className='input-wrapper'>
                    <div className='half'>
                        <label>Prezime:</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className='half'>
                        <label>Šifra:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                </div>
                <button className="primary" type="submit">Registruj se</button>
            </form>
        </div>
    );
}

export default Register;
