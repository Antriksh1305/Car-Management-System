import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// styles
import '../styles/product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';

// components
import Search from '../components/search';
import Profile from '../components/profile';
import ProductCard from '../components/productCard';

// utils
import { getList } from '../utils/getList';

// navigation
import { useNavigate } from 'react-router-dom';

// react-redux
import { useSelector } from 'react-redux';

const Product = () => {
    const [list, setList] = useState([]);
    const userToken = useSelector(state => state.user.userToken);
    const navigate = useNavigate();

    const handleSearch = (search) => {
        console.log(search);
    };

    useEffect(() => {
        if (userToken === null) {
            toast.error('You must be logged in to view products.');
            navigate('/');
            return;
        }
        (async () => {
            try {
                const response = await getList(userToken);
                console.log('List:', response);
                setList(response);
            } catch (error) {
                toast.error('Unable to fetch your products! Try again later!');
                console.log('Error in fetching list:', error);
            }
        })();
    }, [userToken]);

    return (
        <>
            <div><Toaster /></div>
            <div className='header'>
                <FontAwesomeIcon icon={faReact} className='logo' />
                <Search handleSearch={handleSearch} />
                <Profile userName={"Antriksh"} />
            </div>
            <div className='main-content'>
                {
                    list?.map((item, index) => {
                        return <ProductCard key={index} product={item} />
                    })
                }
            </div>
        </>
    )
}

export default Product;
