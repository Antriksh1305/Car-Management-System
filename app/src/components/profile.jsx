import React, { useState, useEffect, useRef } from 'react';

// styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faRightFromBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

// navigation
import { useNavigate } from 'react-router-dom';

// react-redux
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/slices/userSlice';

const Profile = ({ userName }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsPopoverOpen(false);
            }
        };

        if (isPopoverOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopoverOpen]);

    return (
        <div className='profile'>
            <div className='wrapper' onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                <div>{userName}</div>
                <FontAwesomeIcon icon={faCaretDown} className='icon'/>
            </div>
            {isPopoverOpen && (
                <div ref={popoverRef} className='popover'>
                    <div><FontAwesomeIcon icon={faPenToSquare} />Edit Profile</div>
                    <div onClick={() => {
                        dispatch(logOut());
                        navigate('/');
                    }}><FontAwesomeIcon icon={faRightFromBracket} />Logout</div>
                </div>
            )}
        </div>
    )
}

export default Profile;