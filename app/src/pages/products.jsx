import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// styles
import '../styles/product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact } from '@fortawesome/free-brands-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// components
import Search from '../components/search';
import Profile from '../components/profile';
import ProductCard from '../components/productCard';
import Loader from '../components/loader';

// utils
import { getList } from '../utils/getList';

// navigation
import { useNavigate } from 'react-router-dom';

// react-redux
import { useSelector } from 'react-redux';

const Product = () => {
    const [list, setList] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const { userToken, userData } = useSelector(state => state.user);
    const navigate = useNavigate();

    const handleSearch = (search) => {
        if (!search || search === "") {
            return list;
        }

        const filteredList = list.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(search.toLowerCase());
            const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
            return titleMatch || tagsMatch;
        });

        return filteredList;
    };

    useEffect(() => {
        if (userToken === null) {
            toast.error('You must be logged in to view products.');
            setTimeout(() => {
                navigate('/');
            }, 1200);
            return;
        }

        (async () => {
            try {
                setLoading(true);
                const response = await getList(userToken);
                console.log('List:', response);
                setList(response);
            } catch (error) {
                toast.error('Unable to fetch your products! Try again later!');
                console.log('Error in fetching list:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, [userToken, navigate]);

    const handleCreate = () => {

    }

    return (
        <>
            <div><Toaster /></div>
            <div className='header'>
                <FontAwesomeIcon icon={faReact} className='logo' />
                <Search handleSearch={(searchTerm) => setSearch(searchTerm)} />
                <Profile userName={userData?.name} />
            </div>
            <div className='content'>
                <div className='heading'>
                    <h2>Your Products</h2>
                    <FontAwesomeIcon icon={faPlus} className='icon' onClick={() => {
                        navigate('/create');
                    }} />
                </div>
                <div className='main-content'>
                    {
                        loading ? <>
                            <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Loader width={'80px'} borderWidth={'6px'} color={'#ffffff'} />;
                            </div>
                        </> : handleSearch(search)?.map((item, index) => (
                            <ProductCard key={index} product={item} />
                        ))
                    }
                </div>
            </div>
        </>
    )
};

export default Product;
