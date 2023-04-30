import React from "react";
const SideBar = (prop)=>{

    const s_nav_item = prop.aray.map((item)=>{
        return <li key={item.id}  className='nav-item m-2' ><a id={item.id} onClick={prop.onClickInItem} className='nav-link' href='#'>{item.navItemName}</a></li>
    })

    const color = ()=>{
        if (prop.title==="Admin")return "black"
        if (prop.title==="Doctor")return "dark"
        if (prop.title==="Patient")return "dark"
    }


    return(
        <div style={{width:'23%',minWidth:'250px'}} className={' vh-100 rounded-right text-white p-3 bg-'+color()}>
            <div className='d-flex  justify-content-center pt-4'>
                <img className=''  height='100px' src={prop.pic}/> </div>
            <div className='d-flex row  justify-content-center  p-3 '>
                <h4 className=' w-auto ' >{prop.title}</h4>
                <h6 className=' bg-primary p-2 rounded  text-center ' >{prop.name} </h6>
            </div>
            <hr className="hr"/>



            <ul className='navbar-nav   '>
                {s_nav_item}
            </ul> <hr className="hr"/>
            <p className="text-center text-secondary " >© 2023 UnivSaida </p>

        </div>

    )
}

export default SideBar