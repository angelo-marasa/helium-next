import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SingleHotspot = (props) => {
    const router = useRouter()
    const { address } = router.query
    const [hotspotData, setHotspotData] = useState();
    const [activity, setActivity] = useState();
    function handleActivity(data) {
        setActivity(data);
    }

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
            axios.get(`${props.heliumApiDomain}/hotspots/${address}`)
            .then(res => {
                HandleHotspot(res.data.data);
            })

            axios.get(`${props.heliumApiDomain}/hotspots/${address}/activity`)
            .then(res => {
                axios.get(`${props.heliumApiDomain}/hotspots/${address}/activity?cursor=${res.data.cursor}`)
                .then(res => {
                    handleActivity(res.data.data);
                    console.log(res.data.data);
                })
            })

    },[address]);


    if (activity) {
        const hotspotActivity = activity.map((act, key) => 
            <div key={key}>
            {key} : {act.type}
            </div>
        )
    }

    {
        if (hotspotData ) {
            return (
                <>
                    <p className="cursor-pointer" onClick={() => router.back()}><FontAwesomeIcon icon={faAngleDoubleLeft} /> Back</p>
                    <h1 className="text-3xl font-bold">
                        {CapitalizeTheFirstLetterOfEachWord(hotspotData.name.replace(/-/g, " "))}
                    </h1>
                    <p>
                        More coming soon.
                    </p>
                    <hr/>
                        {
                            hotspotActivity ? hotspotActivity : 'Loading Activity...'
                        }
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
