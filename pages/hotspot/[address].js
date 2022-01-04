import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SingleHotspot = (props) => {
    const Router = useRouter()
    const { address } = Router.query
    const [hotspotData, setHotspotData] = useState();

    function HandleHotspot(data) {
        setHotspotData(data);
    }

    function CapitalizeTheFirstLetterOfEachWord(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
           separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
           separateWord[i].substring(1);
        }
        return separateWord.join(' ');
     }

     useEffect(() => {
            if (!address) {
                return;
            }
          console.log('my query exists!!', address);
            axios.get(`${props.heliumApiDomain}/hotspots/${address}`)
            .then(res => {
                HandleHotspot(res.data.data.name);
            })
    },[address]);

    {
        if (hotspotData ) {
            return (
                <>
                    <p className="cursor-pointer" onClick={() => router.back()}><FontAwesomeIcon icon={faAngleDoubleLeft} /> Back</p>
                    <h1 className="text-3xl font-bold">
                        {CapitalizeTheFirstLetterOfEachWord(hotspotData.replace(/-/g, " "))}
                    </h1>
                    <p>
                        More coming soon.
                    </p>
                </>
            ) 
        } else {
            return (
            <></>
            )
        }
    }
    
}

export default SingleHotspot
