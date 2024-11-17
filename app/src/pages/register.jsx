import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// styles
import "../styles/auth/common.css";

// assets
import { images } from "../assets/images";

// utils
import { Register } from '../utils/register';

// navigation
import { useNavigate } from "react-router-dom";

// components
import Loader from '../components/loader';

// redux
import { useSelector } from "react-redux";

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProcess, setInProcess] = useState(false);
    const [loader, setLoader] = useState(true);
    const userToken = useSelector(state => state.user.userToken);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (userToken) navigate('/products');

        setLoader(false);
    }, [userToken]);

    const handleRegister = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setInProcess(true);

                const response = await Register(name, email, password);
                if (response?.token) {
                    toast.success('Account made successfully! Login to continue!');

                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                } else {
                    throw new Error(response.message);
                }
            } catch (err) {
                toast.error(err.message);
                console.log('Registration error:', err.message);
            } finally {
                setInProcess(false);
            }
        })();
    }

    if (loader) {
        return <div className="loader-cont">
            <Loader width={'90px'} borderWidth={'8px'} color={'#ffffff'} />;
        </div>
    } else {
        return (
            <div className="login-page">
                <div><Toaster /></div>
                <div className="login-container">
                    <div className="image-container">
                        <img lazy src={images.bg2} alt="register" className="login-image" />
                    </div>
                    <div className="form-container">
                        <div className="title font-700">Spyne Cars</div>
                        <div className="heading">Register</div>
                        <form className="login-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    className="input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    placeholder="Enter your Name"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="input"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Enter your password"
                                    autoComplete="true"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                {inProcess ? (
                                    <div className="loader-container">
                                        <Loader width={'24px'} borderWidth={'3px'} color={'#ffffff'} />
                                    </div>
                                ) : (
                                    <button type="submit" className="btn btn-fill font-500" onClick={handleRegister}>Register</button>
                                )}
                            </div>
                        </form>
                        <div className="register-text">
                            Don't have an account? <Link to='/'>
                                <span className="p2">Login</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Registration;
