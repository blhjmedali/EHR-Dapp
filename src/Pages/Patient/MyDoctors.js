import React, {useEffect, useState} from "react";
import Popup from "./Popup";
import MyInformation from "./MyInformation";
import DisplayRowKV from "../../Components/DisplayRowKV";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import img from "../../images/img_2.png"
import DoctorCard from "./DoctorCard";
import controler from "../../controler";



function MyDoctors (prop){


    //const [doc_card_info , cardHandler]=useState([])
    const [docCardInfo, setDocCardInfo] = useState([]);
    const [click , clickHandler]=useState(false)

    useEffect(() => {
        const init = async () => {
            const a = new controler(window.ethereum.selectedAddress);
            const my_doctors = await a.getMyDoctors();
            const doctorCards = [];

            for (let i in my_doctors) {
                const obj = Object.assign({}, await a.getDoctorinfo(my_doctors[i]), { address: my_doctors[i] });
                doctorCards.push(obj);
            }

            setDocCardInfo(doctorCards);
        };

        init();
    }, [click,prop.changed]);


    function reload() {
        clickHandler(!click)
    }


    return(
        <div className=' p-2'>
            <Popup f5={reload}/>
            <hr className="hr  "/>
            <h4 className='m-4' >My Doctors : </h4>

            {
                docCardInfo.map((value, index) => {
                    return <DoctorCard key={index} obj={value} f5={reload}/>
                })
            }

        </div>
    )
}
export default MyDoctors