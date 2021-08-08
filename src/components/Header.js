import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../context';
import './Header.scss';

export default function Header(){
    const data = useContext(myContext);
    const [ logedin, setLogedin ] = useState();
    const [ user, setUser ] = useState()

    useEffect(()=>{
        fetch('/login')
        .then(res => res.json())
        .then(user =>setUser(user))
    },[])


    useEffect(()=>{
        setLogedin(data.state.logedin)
        console.log(logedin)
    },[data])

    return (
    <div className="header">
        <Link to={'/computer'}><button className='computerBtn'>Computer</button></Link>
        {logedin ? (
            <>
            <form action = "/logout" method = "POST">
                <button className='logoutBtn' type = 'submit'>Logout</button>
            </form>
            {user==='admin'?(
                <Link to={'/'}><button className='loginBtn'>Register</button></Link>
            ):(<></>)}
            </>
        ):(
            <Link to={'/'}><button className='loginBtn'>Login</button></Link>
        )}
    </div>
    );
}