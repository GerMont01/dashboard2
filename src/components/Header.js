import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../context';
import { IoMdPower } from 'react-icons/io';
import { FaUserPlus } from 'react-icons/fa';
import { GiBigGear } from 'react-icons/gi';
import './Header.scss';

export default function Header(){
    const data = useContext(myContext);
    const [ logedin, setLogedin ] = useState();
    const [ user, setUser ] = useState()


    useEffect(()=>{
        setLogedin(data.state.logedin)
        setUser(data.state.user)
    },[data])

    return (
        <>
        <p className='copyRight'>© 2021 | Gerardo Montero</p>
        <div className="header">
            {logedin ? (
                <>
                {user==='admin'?(
                    <>
                    <Link to={'/computer'}><button className='sysBtn'><GiBigGear className='system'/> System</button></Link>
                    <Link to={'/'}><button className='regBtn'><FaUserPlus className='register'/> Register</button></Link>
                    </>
                ):(<></>)}
                <form action = "/logout" method = "POST">
                <button className='logoutBtn' type = 'submit'><IoMdPower className='logoutIcon'/> Logout</button>
                </form>
                </>
            ):(<></>)}
        </div>
        </>
    );
}