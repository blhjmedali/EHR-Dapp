import React from "react";
import {Link} from "react-router-dom";

const Header = () =>{
    return(
        <nav className='navbar navbar-expand-md sticky-top  navbar-dark bg-dark navbar-fixed'>
            <div className="m-2">
                <a className="navbar-brand p-3" >DossierMedical</a>
            </div>
            <div className="collapse navbar-collapse ">
                <ul className='navbar-nav  '>
                    <li className='nav-item'> <Link to='/Admin'className='nav-link' > Admin</Link></li>
                    <li className='nav-item'> <Link to='/Doctor'className='nav-link' > Doctor</Link></li>
                    <li className='nav-item'> <Link to='/Patient'className='nav-link' > Patient</Link></li>
                    <li className='nav-item'> <Link to='#'className='nav-link' > About</Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default Header
