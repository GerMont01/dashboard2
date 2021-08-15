import React from 'react';
import Login from './login';

function Invalid() {


    return ( 
        <>
            <p style={{width:'100%', position:'absolute', textAlign:'center', top:'20vh', color:'white'}}>Invalid credentials! Please try again</p>
            <Login />
        </>
    );
}
export default Invalid;