import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Earnings from '../components/Hotspots/Earnings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const Dashboard = (props) => {
    const [hotspotCount, setHotspotCount] = useState(0);
    const [hotspots, setHotspots] = useState();
    const [loadTimer, setLoadTimer] = useState(2.0);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        let config = {
            method: 'get',
            url: `${props.apiDomain}/hotspots`,
            headers: { 
              'Accept': 'application/json', 
              'Authorization':  `Bearer ${ localStorage.getItem('token') }`
            }
          };
          
          axios(config)
          .then(function (response) {
              handleHotspotCount(response.data.hotspots);
              handleHotspots(response.data.results);
          })
          .catch(function (error) {
            console.log(error);
          });
    },[]);
    function handleHotspotCount(count) {
        setHotspotCount(count);
    }

    function handleHotspots(data) {
        setHotspots(data);
        setLoading(false);
    }

    function handleEdit() {
        setEdit(!edit);
    }

    function deleteHotspot() {
        
    }
  
    if (!loading) {
        return (
            <>
            <h1 className="text-3xl font-bold">
                My Dashboard
            </h1>
            <span className="float-right text-black hover:cursor-pointer" onClick={() => handleEdit()}>Edit <FontAwesomeIcon icon={faEdit} /></span>
            {
                hotspots.map((hotspot, key) =>
                    (
                        <Earnings address={hotspot.address} hotspotID={hotspot.id} delay={(loadTimer + (key * .3))} editHandler={handleEdit} edit={edit} apiDomain={props.apiDomain} heliumApiDomain={props.heliumApiDomain} key={hotspot.id}/>
                        
                    ))
            }
            </>
        )
    } else {
        return (
            <>
            <h1 className="text-3xl font-bold">
                My Dashboard
            </h1>
            </>
        )
    }
}

export default Dashboard
