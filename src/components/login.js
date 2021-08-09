import React, { useEffect, useState, useContext } from 'react';
import './login.scss';
import { GiBigGear } from 'react-icons/gi';
import { myContext } from '../context';

function Login() {
    const data = useContext(myContext);
    const [ user, setUser ] = useState()
    const [ signup, setSignup] = useState(false)

    useEffect(()=>{
        setUser(data.state.user)
    },[data])

    useEffect(()=>{
        if (user==='admin'){
            setSignup(true)
        }
    },[user])
    return ( 
        <div className='login'>
            <div className='logoContainer'>
                <GiBigGear className='logo'/>
                <p>System<br/> Analizer</p>
            </div>
            <div className='loginBox'>
            {signup ? (
                <>
                <form action = "/signup" method = "POST" autoComplete='off'>
                    <input name = "id" type = "text" required placeholder = "User ID"/>
                    <input name = "password" type = "password" required placeholder = "Password"/>
                    <button type = "Submit">Register</button> 
                </form>
                </>
                ):(
                <>
                <form action = "/login" method = "POST" autoComplete='off'>
                    <input name = "id" type = "text" required placeholder = "User ID"/>
                    <input name = "password" type = "password" required placeholder = "Password"/>
                    <button type = "Submit">Log in</button> 
                </form> 
                </>
            )}
            </div>
        </div>
    );
}
export default Login;