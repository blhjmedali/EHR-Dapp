import React from "react";

const SideBar = (prop)=>{

    const s_nav_item = prop.aray.map((item)=>{
        return (
            <li key={item.id}  className='nav-item m-2' >
                <a id={item.id} onClick={prop.onClickInItem} className='nav-link' href='#'>{item.navItemName}</a>
            </li>
        )
    })

    // Custom sidebar theme for each type of user ( Admin / Doctor / Patient / Company )
    let color , bg
    if (prop.title==="Admin")   { color = "black" ; bg = ''}
    if (prop.title==="Doctor")  { color = "dark"  ; bg = 'bg-danger'}
    if (prop.title==="Patient") { color = "dark"  ; bg = 'bg-primary'}
    if (prop.title==="CNAS")    { color = "black" ; bg = ''}
    if (prop.title==="CASNOS")  { color = "black" ; bg = ''}

//col-auto col-md-3 col-xl-2 px-sm-2

    return(
        <div  className={'col-auto col-md-3 col-xl-2 px-sm-2 vh-100 rounded-right text-white p-3 bg-'+color}>

            {/*         Image          */}
            <div className='d-flex  justify-content-center pt-4'>
                <img className=''  height='100px' src={prop.pic}/>
            </div>

            {/*         Title + Name          */}
            <div className='d-flex row  justify-content-center  p-3 '>
                <h4 className=' w-auto ' >{prop.title}</h4>
                <h6 className={'p-2 rounded  text-center '+bg} >{prop.name} </h6>
            </div>
            <hr className="hr"/>


            {/*         navbar items          */}
            <ul className='navbar-nav   '>
                {s_nav_item}
            </ul>

            <hr className="hr"/>
            <p className="text-center text-secondary " >© 2023 Belhadj  </p>

        </div>

    )
}

export default SideBar