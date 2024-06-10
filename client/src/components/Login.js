import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            const { token, role } = response.data;

            localStorage.setItem('token', token);

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    };

    return (
        <div className='blue-wrapper'>
            <div className='blue-wrapper-text'>
                <h2 className='border-right'>Prijava</h2>
                <div className='prijava-wrapper'>
                    <a href='/register' className='white'>
                        <p className='big'>Registrujte se</p>
                    </a>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.3335 8H12.6668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8 3.3335L12.6667 8.00016L8 12.6668" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className='full2'>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div></div>
                <div className='full2'>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button className="primary" type="submit">Prijavi se</button>
            </form>

        </div>
    );
}

export default Login;
