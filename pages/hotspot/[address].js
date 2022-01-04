import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const singleHotspot = (props) => {
    const router = useRouter()
    const { address } = router.query
    const [hotspotData, setHotspotData] = useState();

    function handleHotspot(data) {
        setHotspotData(data);
    }

    function capitalizeTheFirstLetterOfEachWord(words) {
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
                handleHotspot(res.data.data.name);
            })
    },[address]);

    {
        if (hotspotData ) {
            return (
                <>
                    <p className="cursor-pointer" onClick={() => router.back()}><FontAwesomeIcon icon={faAngleDoubleLeft} /> Back</p>
                    <h1 className="text-3xl font-bold">
                        {capitalizeTheFirstLetterOfEachWord(hotspotData.replace(/-/g, " "))}
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

export default singleHotspot
