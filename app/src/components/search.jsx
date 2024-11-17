import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = ({ handleSearch }) => {
    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
    };

    return (
        <div className="search-container">
            <div className="search-bar">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleChange}
                    className="search-input font-400"
                />
            </div>
        </div>
    );
};

export default Search;
