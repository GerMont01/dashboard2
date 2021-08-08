import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MemoryChart from './chart1';
import CpuUsage from './chart2';
import './Computer.scss';

function Computer() {
const [ data, setData ] = useState()
const [ network, setNetwork ] = useState()
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
            
            // for (let key in data.network) {
            //     let network = {
            //         wifi: 
            //     }
            //     var net_infos=net_int[key];
                   
            //     net_infos.forEach(element => {      
            //     no_of_network_interfaces++;
            //     console.log("\tinterface:");
                
            //       for (var attr in element){
            //         console.log("\t\t" + attr + 
            //             " : " + element[attr] );
            //       }
            console.log(data.network['Wi-Fi'])
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
                            <p><span>Host Name:</span> {data.host}</p>
                            <p><span>Operating System:</span> {data.sys}</p>
                            <p><span>Version:</span> {data.version}</p>
                            <p><span>Architecture:</span> {data.arch}</p>
                            <p><span>Uptime:</span> {data.uptime}s</p>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <p><span>CPU Model:</span> {data.model}</p>
                            <p><span>CPU Speed:</span> {data.speed/1000}GHz</p>
                            <p><span>CPU Usage:</span> {(data.cpuUsage*100).toFixed(2)}%</p>
                            <p><span>Logical Processors:</span> {data.cores}</p>
                        </div>
                    </Col>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <p><span>Total Memory:</span> {(data.totalmem/1073741824).toFixed(2)}GB</p>
                            <p><span>Free Memory:</span> {(data.freemem/1073741824).toFixed(2)}GB</p>
                            <p><span>Total Disk Space:</span> {(data.diskspace.size/1073741824).toFixed(2)}GB</p>
                            <p><span>Free Disk Space:</span> {(data.diskspace.free/1073741824).toFixed(2)}GB</p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4} className='col'>
                        <div className='div'>
                            <p>{data.network['Wi-Fi'][0].family}</p>
                            <p className='pTag'><span>Address:</span> {data.network['Wi-Fi'][0].address}</p>
                            <p className='pTag'><span>Netmask:</span> {data.network['Wi-Fi'][0].netmask}</p>
                            <p className='pTag'><span>Mac:</span> {data.network['Wi-Fi'][0].mac}</p>
                            <p>{data.network['Wi-Fi'][1].family} </p>
                            <p className='pTag'><span>Address:</span> {data.network['Wi-Fi'][1].address}</p>
                            <p className='pTag'><span>Netmask:</span> {data.network['Wi-Fi'][1].netmask}</p>
                            <p className='pTag'><span>Mac:</span> {data.network['Wi-Fi'][1].mac}</p>
                        </div>
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