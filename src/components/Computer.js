import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import MemoryChart from './chart1';
import CpuUsage from './chart2';
import DiskChart from './chart3';
import './Computer.scss';
import { myContext } from '../context';

let boxesStatus = {
    box1: false,
    box2: false,
    box3: false,
    box4: false,
    box5: false,
    box6: false
}

function Computer() {
    const cxtdata = useContext(myContext);
    const [ user, setUser ] = useState()
    const [ data, setData ] = useState()
    const [ chart1, setChart1 ] = useState([])
    const [ chart2, setChart2 ] = useState([])
    const [ chart3, setChart3 ] = useState([])
    const [ auth, setAuth ] = useState()
    const [ boxes, setBoxes ] = useState(boxesStatus)
    const [ network, setNetwork ] = useState()

    useEffect(()=>{
        setUser(cxtdata.state.user)
    },[cxtdata])

    useEffect(()=> {
        setInterval(function(){ 
            getData();
        }, 1000); 
        
        fetch('/protected_page')
        .then(res => res.json())
        .then(data => setAuth(data))

        fetch('/admin')
        .then(res=>res.json())
        .then(res=>{
            let keys = Object.keys(res);
            let currentBoxes = boxes;
            for (let key of keys) {
                currentBoxes[key] =  res[key];
            }
            setBoxes(currentBoxes);
        }) 
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
            ////////
            let newValue3 = [
                { name: "Used Disk Space", value: Math.round((data.diskspace.size-data.diskspace.free)/1073741824) },
                { name: "Free Disk Space", value: Math.round(data.diskspace.free/1073741824) }
              ];
            setChart3(newValue3)  


            if (Object.keys(data.network).some(key=>key==='Wi-Fi')){
                setNetwork('Wi-Fi') 
            } else {
                setNetwork('eno1')
            }
        }
    },[data])

    const getData = () => {
        fetch('/api/system')
        .then(res => res.json())
        .then(data =>setData(data))
    }

    function postBoxes(data){
        fetch('/admin',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>res.json())
        .then(res=>{
            console.log('Success')
        })
    }
    return (
        typeof auth !== 'object' ? (
        data ? (
            <Container className='sysContainer'>
                <Row>
                    <Col xs={4} md={3} className='col'>
                        {user==='admin' ? (
                            <input type='checkbox' id='box1' checked={boxes.box1} onChange={(e)=>{
                                postBoxes({box1:e.target.checked});
                                let currentboxes = boxes;
                                currentboxes.box1 = e.target.checked;
                                setBoxes(currentboxes)
                            }}/>
                         ):(<></>)}  
                        {(user==='admin'|| boxes.box1) ? (
                            <div className='div'>
                                <p><span>Host Name:</span> {data.host}</p>
                                <p><span>Operating System:</span> {data.sys}</p>
                                <p><span>Version:</span> {data.version}</p>
                                <p><span>Architecture:</span> {data.arch}</p>
                                <p><span>Uptime:</span> {data.uptime}s</p>
                            </div> 
                        ):(<></>)}
                    </Col>
                    <Col xs={4} md={4} className='col'>
                    {user==='admin' ? (
                            <input type='checkbox' id='box2' checked={boxes.box2} onChange={(e)=>{
                                postBoxes({box2:e.target.checked});
                                let currentboxes = boxes;
                                currentboxes.box2 = e.target.checked;
                                setBoxes(currentboxes)
                            }}/>
                         ):(<></>)}  
                        {(user==='admin'|| boxes.box2) ? (
                        <div className='div'>
                            <p><span>CPU Model:</span> {data.model}</p>
                            <p><span>CPU Speed:</span> {data.speed/1000}GHz</p>
                            <p><span>CPU Usage:</span> {(data.cpuUsage*100).toFixed(2)}%</p>
                            <p><span>Logical Processors:</span> {data.cores}</p>
                            <p><span>Total Memory:</span> {(data.totalmem/1073741824).toFixed(2)}GB</p>
                            <p><span>Free Memory:</span> {(data.freemem/1073741824).toFixed(2)}GB</p>
                        </div>
                        ):(<></>)}
                    </Col>
                    <Col xs={4} md={5} className='col'>
                    {user==='admin' ? (
                            <input type='checkbox' id='box3' checked={boxes.box3} onChange={(e)=>{
                                postBoxes({box3:e.target.checked});
                                let currentboxes = boxes;
                                currentboxes.box3 = e.target.checked;
                                setBoxes(currentboxes)
                            }}/>
                         ):(<></>)}  
                        {(user==='admin'|| boxes.box3) ? (
                        <div className='div disk'>
                            <p><span>Disk Usage</span></p>
                            <div>
                                <DiskChart data={chart3} />
                                <div>
                                    <p><span>Total Disk Space:</span> {Math.round(data.diskspace.size/1073741824)}GB</p><br/>
                                    <p><span>Free Disk Space:</span> {Math.round(data.diskspace.free/1073741824)}GB</p>
                                </div>
                            </div>
                        </div>
                        ):(<></>)}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={4} className='col'>
                    {user==='admin' ? (
                            <input type='checkbox' id='box4' checked={boxes.box4} onChange={(e)=>{
                                postBoxes({box4:e.target.checked});
                                let currentboxes = boxes;
                                currentboxes.box4 = e.target.checked;
                                setBoxes(currentboxes)
                            }}/>
                         ):(<></>)}  
                        {(user==='admin'|| boxes.box4) ? (
                        <div className='div'>
                            {network ? (
                            <>
                                <p>{data.network[network][0].family}</p>
                                <p className='pTag'><span>Address:</span> {data.network[network][0].address}</p>
                                <p className='pTag'><span>Netmask:</span> {data.network[network][0].netmask}</p>
                                <p className='pTag'><span>Mac:</span> {data.network[network][0].mac}</p>
                                <p>{data.network[network][1].family} </p>
                                <p className='pTag'><span>Address:</span> {data.network[network][1].address}</p>
                                <p className='pTag'><span>Netmask:</span> {data.network[network][1].netmask}</p>
                                <p className='pTag'><span>Mac:</span> {data.network[network][1].mac}</p>
                            </>
                            ):(<></>)}
                        </div>
                        ):(<></>)}
                    </Col>
                    <Col xs={6} md={4} className='col'>
                    {user==='admin' ? (
                            <input type='checkbox' id='box5' checked={boxes.box5} onChange={(e)=>{
                                postBoxes({box5:e.target.checked});
                                let currentboxes = boxes;
                                currentboxes.box5 = e.target.checked;
                                setBoxes(currentboxes)
                            }}/>
                         ):(<></>)}  
                        {(user==='admin'|| boxes.box5) ? (
                        <div className='div'>
                            <CpuUsage data={chart2} />
                        </div>
                        ):(<></>)}
                    </Col>
                    <Col xs={6} md={4} className='col'>
                    {user==='admin' ? (
                            <input type='checkbox' id='box6' checked={boxes.box6} onChange={(e)=>{
                                postBoxes({box6:e.target.checked});
                                let currentboxes = boxes;
                                currentboxes.box6 = e.target.checked;
                                setBoxes(currentboxes)
                            }}/>
                         ):(<></>)}  
                        {(user==='admin'|| boxes.box6) ? (
                        <div className='div'>
                            <MemoryChart data={chart1} />
                        </div>
                        ):(<></>)}
                    </Col>
                </Row>
            </Container> 
        ) : (
           <div className='loading'><AiOutlineLoading3Quarters className='loadingIcon'/> </div> 
        )
    ):(
        <p className='notAuth'>User should be authenticated!</p>
    )
    );
}
export default Computer;