import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import { IoIosAddCircle } from "react-icons/io";


const DisplayList = (prop) =>{

    const [list  , setList  ] = useState([])
    const [input , setInput ] = useState('')
    const [click , setClick]= useState(false)

    useEffect(()=>{
        setList(prop.lst)
    },)

    const list_item = list.map((item,index)=>{
        return <li key={index}>{item} </li>
    })


    function onChangeHandler(e) {setInput(e.target.value)}

    function clickHandler() {
        if(input!=""){
            // create new Array
            let a = []
            // fill the new Array with items from list
            list.map((value, index)=>{
                a.push(value)
            })
            // add input to new array
            a.push(input)

            prop.setList(a)


            setInput("")    // init input to ''
            setClick(!click)     // update useEffect


        }else {     console.log('input is undefined')   }

    }

    return(
        <div>
            <h6  className='text-warning pt-5 '><b>{prop.titlee}</b> </h6>
            <ul>
                {list_item}
            </ul>

            {prop.editable?
                <div className='d-flex  '>
                    <input className='form-control form-control-sm  w-50 bg-light h-50 align-self-center '
                           onChange={onChangeHandler}
                           value={input} />
                    <Button className='' variant="outlined" onClick={clickHandler}>
                        <IoIosAddCircle  className='carousel-control-next-icon w-75'/>
                    </Button>
                </div>:<></>
            }
            

        </div>
    )
}
DisplayList.defaultProps={
    lst:[],
    titlee:null,
    editable:false,
}
export default DisplayList