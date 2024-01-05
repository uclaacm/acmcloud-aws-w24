import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import Logo from '../assets/Logo.png';
import { useAuth } from "../Auth";

import '../App.css';

function Header({dimensions}) {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    //Function to clear authentication state and navigate to search page
    const logout = () => {
        setUser(null);
        navigate("/login")
    };

    const DEFAULT_PAGE_MAPPING = {
        'Login': {to: '/login'}
    }
    
    const LOGGED_IN_PAGE_MAPPING = {
        'My Profile': {to: '/profile'},
        'Search': {to: '/search'},
        'Log Out': {to: '/logout', onClick: logout}
    }
    

    return (
        <div>
            <ul className="nav-menu">   
                <div>
                    <Link to="/"><li className='logo-item' key="site-name"><img src={Logo} width='40px'></img></li></Link>
                </div>
                <div>
                    {Object.entries(user ? LOGGED_IN_PAGE_MAPPING: DEFAULT_PAGE_MAPPING).map(([key, value]) => 
                    <Link to={value.to} key={value.to} onClick={'onClick' in value ? value.onClick : null}><li className='nav-item'>{key}</li></Link>)}
                </div>
            </ul>
        </div>
    );
}

export default Header;