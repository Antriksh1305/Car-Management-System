import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className='product-card'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" alt="No Image Available" className='product-image' />
            <div className='product-details'>
                <h3 className='product-title'>{product.title}</h3>
                <p className='product-description'>{product.description}</p>
                <div className='tags'>
                    {
                        product?.tags.map((tag, index) => (
                            <span key={index} className='tag'>{tag}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductCard;