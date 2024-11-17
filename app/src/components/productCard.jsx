import React from 'react';

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

// navigation
import { useNavigate } from 'react-router-dom';

// utils

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    
    const handleDelete = () => {
        console.log('delete');
    }

    const handleUpdate = () => {
        navigate(`/update/${product._id}`, { state: { product: product } });
    }

    return (
        <div className="product-card">
            <img 
                src="https://osthetic.com/wp-content/uploads/2021/12/osthetic-no-image-comingsoon.webp" 
                alt="No Image Available" 
                className="product-image" 
            />
            <div className="product-details">
                <h3 className="product-title font-700">{product.title}</h3>
                <p className="product-description font-400">{product.description}</p>
                <div className="tags">
                    {
                        product?.tags?.map((tag, index) => (
                            <span key={index} className="tag font-300">{tag.charAt(0).toUpperCase() + tag.slice(1)}</span>
                        ))
                    }
                </div>
            </div>
            <div className='product-changes'>
                <FontAwesomeIcon icon={faTrashCan} className='icon' onClick={handleDelete} />
                <FontAwesomeIcon icon={faPenToSquare} className='icon' onClick={handleUpdate} />
            </div>
        </div>
    );
};

export default ProductCard;
