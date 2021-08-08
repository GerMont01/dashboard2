import React, { useEffect, useState } from 'react';
import './login.scss';
import { GiBigGear } from 'react-icons/gi'

function Login() {
    const [ user, setUser ] = useState()
    const [ signup, setSignup] = useState(false)

    useEffect(()=>{
        fetch('/login')
        .then(res => res.json())
        .then(user =>setUser(user))
    },[])

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
                <form action = "/signup" method = "POST">
                    <input name = "id" type = "text" required placeholder = "User ID"/>
                    <input name = "password" type = "password" required placeholder = "Password"/>
                    <button type = "Submit">Signup</button> 
                </form>
                <p onClick={()=>setSignup(false)}>Return</p>
                </>
                ):(
                <>
                <form action = "/login" method = "POST">
                    <input name = "id" type = "text" required placeholder = "User ID"/>
                    <input name = "password" type = "password" required placeholder = "Password"/>
                    <button type = "Submit">Log in</button> 
                </form> 
                {/* <p onClick={()=>setSignup(true)}>Don't have an account yet? Sign up</p> */}
                </>
            )}
            </div>
        </div>
    );
}
export default Login;