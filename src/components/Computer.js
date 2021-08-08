import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MemoryChart from './chart1';
import CpuUsage from './chart2';
import './Computer.scss';

function Computer() {
const [ data, setData ] = useState()
const [ chart1, setChart1 ] = useState([])
const [ chart2, setChart2 ] = useState([])
const [ auth, setAuth ] = useState()

    useEffect(()=>{
        fetch('/protected_page')
        .then(res => res.json())
        .then(data => setAuth(data))
    },[])

    useEffect(()=> {
        setInterval(function(){ 
            getData();
        }, 1000);   
    },[])
    useEffect(()=>{
        if (data) {
            let newValue = {
                name: '',
                Memory_Usage: parseFloat(((1 - (data.freemem/data.totalmem)) * 100).toFixed(2))
            }
            let currentValue = chart1.slice(Math.max(chart1.length - 60, 0))
            setChart1([...currentValue,newValue])
            /////////////
            let newValue2 = {
                name: '',
                CPU_Usage: parseFloat((data.cpuUsage*100).toFixed(2))
            }
            let currentValue2 = chart2.slice(Math.max(chart2.length - 60, 0))
            setChart2([...currentValue2,newValue2])
        }
        
    },[data])

    const getData = () => {
        fetch('/api/system')
        .then(res => res.json())
        .then(data =>setData(data))
    }
    return (
        typeof auth !== 'object' ? (
        data ? (
            <Container className='sysContainer'>
                <Row>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <p>Operating System: {data.sys}</p>
                            <p>Architecture: {data.arch}</p>
                            <p>Uptime: {data.uptime}s</p>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <p>CPU Model: {data.model}</p>
                            <p>CPU Speed: {data.speed/1000}GHz</p>
                            <p>CPU Usage: {(data.cpuUsage*100).toFixed(2)}%</p>
                            <p>Logical Processors: {data.cores}</p>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <p>Total Memory: {(data.totalmem/1073741824).toFixed(2)}GB</p>
                            <p>Free Memory: {(data.freemem/1073741824).toFixed(2)}GB</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'></div>
                    </Col>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <CpuUsage data={chart2} />
                        </div>
                    </Col>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <MemoryChart data={chart1} />
                        </div>
                    </Col>
                </Row>
            </Container> 
        ) : (
           'Loading...'  
        )
    ):(
        <p className='notAuth'>User should be authenticated!</p>
    )
    );
}
export default Computer;