import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Profile() {
const [ data, setData ] = useState()
    useEffect(()=>{
        fetch('/protected_page')
        .then(res => res.json())
        .then(data => setData(data))
    },[])
    return ( 
        <>
            {typeof data !== 'object' ? (
                <>
                <p>Welcome {data}</p>
                <form action = "/logout" method = "POST">
                    <button type = 'submit'>Logout</button>
                </form>
                </>
            ):(
                <p>User should be authenticated!</p>
            )}
        </>
    );
}
export default Profile;