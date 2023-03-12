import React from "react";
import img from '../images/Pation.png'
import {Link} from "react-router-dom";

const SideBar = (prop)=>{

    const s_nav_item = prop.aray.map((item)=>{
        return <li key={item.id}  className='nav-item m-2' ><a id={item.id} onClick={prop.onClickInItem} className='nav-link' href='#'>{item.navItemName}</a></li>
    })

    return(
        <div style={{width:'23%',minWidth:'250px'}} className='bg-black vh-100 rounded-right text-white p-3'>
            <div className='d-flex  justify-content-center pt-4'>
                <img className=''  height='100px' src={prop.pic}/> </div>
            <div className='d-flex  justify-content-center p-3'> <h4>{prop.title}</h4> </div>
            <hr className="hr"/>

            <ul className='navbar-nav   '>
                {s_nav_item}
            </ul> <hr className="hr"/>
            <p className="text-center text-secondary " >© 2023 UnivSaida </p>

        </div>

    )
}

export default SideBar