import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProcess, setInProcess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setInProcess(true);

                const response = await Register(email, password);

                if (response?.token) {
                    toast.success('Account made successfully!');

                    dispatch(updateUser({ userToken: response.token }));
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    }, 1000);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Registration error! Try again later!');
                console.log('Registration error:', error);
            } finally {
                setInProcess(false);
            }
        })();
    }

    return (
        <div className="login-page">
            <div><Toaster /></div>
            <div className="login-container">
                <div className="image-container">
                    <img src={images.bg1} alt="register" className="login-image" />
                </div>
                <div className="form-container">
                    <div className="title font-700">Cars16</div>
                    <div className="heading">Register</div>
                    <form className="login-form">
                    <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
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
                                    <Loader width={'24px'} borderWidth={'2px'} />
                                </div>
                            ) : (
                                <button type="submit" className="btn btn-fill font-500" onClick={handleRegister}>Register</button>
                            )}
                        </div>
                    </form>
                    <div className="register-text">
                        Don't have an account? <Link to='/login'>
                            <span className="p2">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
