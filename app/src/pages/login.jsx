import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

// styles
import "../styles/auth/common.css";

// assets
import { images } from "../assets/images";

// utils
import { Login } from '../utils/login';

// navigation
import { useNavigate } from "react-router-dom";

// components
import Loader from '../components/loader';

// redux
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/slices/userSlice";

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [inProcess, setInProcess] = useState(false);
    const [loader, setLoader] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userToken = useSelector(state => state.user.userToken);

    useEffect(() => {
        if (userToken) navigate('/products');

        setLoader(false);
    }, [userToken]);

    const handleLogin = (e) => {
        e.preventDefault();
        (async () => {
            try {
                setInProcess(true);

                const response = await Login(email, password);

                if (response?.token) {
                    toast.success('Login successful!');

                    dispatch(updateUser({ userToken: response.token, userData: response.user }));
                    setTimeout(() => {
                        navigate('/products');
                    }, 1000);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                toast.error('Login error! Try again later!');
                console.log('Login error:', error);
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
                        <img src={images.bg1} alt="login" className="login-image" />
                    </div>
                    <div className="form-container">
                        <div className="title font-700">Spyne Cars</div>
                        <div className="heading">Login</div>
                        <form className="login-form">
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
                                    <button type="submit" className="btn btn-fill font-500" onClick={handleLogin}>Login</button>
                                )}
                            </div>
                        </form>
                        <div className="register-text">
                            Don't have an account? <Link to='/register'>
                                <span className="p2">Register</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default LogIn;
