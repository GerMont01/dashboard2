import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { myContext } from '../context';

function Home(){
  const data = useContext(myContext);
  const [ logedin, setLogedin ] = useState();

  useEffect(()=>{
    setLogedin(data.state.logedin)
    console.log(logedin)
  },[data])

  return (
    <div className="App">
      <h1>Project Home</h1>
    </div>
  )
}
export default Home;