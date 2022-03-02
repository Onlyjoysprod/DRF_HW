import React from 'react';
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <div>
            <nav>
                <li><Link to='/'>Users</Link></li>
                <li><Link to='/projects/'>Projects</Link></li>
                <li><Link to='/notes/'>Notes</Link></li>
            </nav>
        </div>
    )
}

export default Menu
