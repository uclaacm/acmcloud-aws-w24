import { Link } from "react-router-dom";
import React from 'react'
import Logo from '../assets/Logo.png'

import '../App.css';

const DEFAULT_PAGE_MAPPING = {
    'Login': '/login'
}

const LOGGED_IN_PAGE_MAPPING = {
    'Home': '/home',
    'My Profile': '/profile',
    'Search': '/search',
    'Signout': '/signout'
}


function Header({dimensions, auth}) {
    return (
        <div>
            <ul className="nav-menu">
                <div>
                    <Link to="/"><li className='nav-item logo' key="site-name"><img src={Logo} width='40px'></img></li></Link>
                </div>
                <div>
                    {Object.entries(DEFAULT_PAGE_MAPPING).map(([key, value]) => 
                    <Link to={value} key={value}><li className='nav-item'>{key}</li></Link>)}
                </div>
            </ul>
        </div>
    );
}

export default Header;