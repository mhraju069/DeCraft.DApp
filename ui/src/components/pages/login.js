import React, { useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';
import Alert from '../hooks/Alert';
import Grids from '../hooks/grids';
import { useWallet } from '../hooks/connect';



const Login = () => {
    const { Connect, wallet, addrs, isNewUser } = useWallet();

    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [role, setRole] = useState('');


    const [profileData, setProfileData] = useState({
        name: '',
        email: ''
    });

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        console.log('handle submit clickeed')
        if (!role) {
            setError(true);
            return;
        }


        try {
            const updateRes = await axios.post(
                "http://localhost:8000/api/update-user/", { wallet: wallet, name: profileData.name, email: profileData.email, role: role })
            Alert("Sign Up Successful", "success")
            navigate('/dashboard');
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {
        const redirectIfAuthenticated = async () => {
            const token = localStorage.getItem('token');
            if (token && location.pathname === '/login') {  // Only redirect if on login page
                try {
                    const res = await axios.get('http://localhost:8000/api/check-authentication/', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (res.status === 200) {
                        console.log("Token is valid");
                        // Navigate and pass location state
                        Alert("Login Successful", "success")
                        navigate('/dashboard', { state: {  loginSuccess: true } });
                    }
                } catch (err) {
                    console.log("Token invalid or expired");
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };

        redirectIfAuthenticated();
    }, [location.pathname]);



    return (
        <div className="login-page">
            <Grids />
            <div className="login-container">
                <div className="login-header">
                    <div className="login-title">Log In</div>
                    <div className="tagline">Log in to connect with future of decentralized AI collaboration</div>
                </div>

                {!wallet && <div className="wallet-buttons">
                    <button className="wallet-btn metamask" onClick={Connect}>
                        <i className="fab fa-ethereum"></i>
                        Connect MetaMask
                    </button>
                    <div className="divider">
                        or
                    </div>
                    <button className="wallet-btn walletconnect" >
                        <i className="fas fa-wallet"></i>
                        Connect WalletConnect
                    </button>
                </div>}


                {isNewUser && (
                    <form className="login-form" onSubmit={handleProfileSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter your full name"
                                value={profileData.name}
                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="role-selection">
                            <div className={`role-option ${error ? 'role-not-selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="data-provider"
                                    name="role"
                                    value="data-provider"
                                    checked={role === 'data-provider'}
                                    onChange={(e) => setRole(e.target.value)}

                                />
                                <label htmlFor="data-provider" className="role-card">
                                    <i className="fas fa-database"></i>
                                    <h4>Data Provider</h4>
                                    <p>Contribute datasets to train AI models and earn rewards</p>
                                </label>
                            </div>

                            <div className={`role-option ${error ? 'role-not-selected' : ''}`}>
                                <input
                                    type="radio"
                                    id="ai-developer"
                                    name="role"
                                    value="ai_developer"
                                    checked={role === 'ai_developer'}
                                    onChange={(e) => setRole(e.target.value)}

                                />
                                <label htmlFor="ai-developer" className="role-card">
                                    <i className="fas fa-robot"></i>
                                    <h4>AI Developer</h4>
                                    <p>Build, train and deploy AI models using our platform</p>
                                </label>
                            </div>
                        </div>
                        {error && <p className="error-message" style={{ fontSize: '14px', color: 'red', width: '100%', opacity: '0.8', marginTop: '-5px' }}>❌ Please select your role </p>}

                        <button type="submit" className="submit-btn">Continue</button>
                    </form>
                )}


                <div className="footer-text">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </div>
            </div></div>
    );
};

export default Login;
