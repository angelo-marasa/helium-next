import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons'


const Earnings = ({address, hotspotID, delay, editHandler, edit, apiDomain, heliumApiDomain}) => {
    const [loading, setLoading] = useState(true);
    const [hotspot, setHotspot] = useState();
    const [earningsToday, setEarningsToday] = useState();
    const [earningsYesterday, setEarningsYesterday] = useState();
    const [earningsSevenDays, setEarningsSevenDays] = useState();
    const [earningsThirtyDays, setEarningsThirtyDays] = useState();
    const [currentPrice, setCurrentPrice] = useState();
    const [lastActive, setLastActive] = useState();
    const [showMe, setShowMe] = useState(true);

    function handleLoading() {
        setLoading(false);
    }

    function handleLastActive(last, block) {
        setLastActive(block - last);
    }

    function handleCurrentPrice(price) {
        setCurrentPrice((price / 100000000));
    }

    function handleHotspot(data) {
        setHotspot(data);
    }

    function handleEarnings(today, yesterday, sevenDay, thirtyDay) {
        setEarningsToday(today);
        setEarningsYesterday(yesterday);
        setEarningsSevenDays(sevenDay);
        setEarningsThirtyDays(thirtyDay);
    }


    function capitalizeTheFirstLetterOfEachWord(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
           separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
           separateWord[i].substring(1);
        }
        return separateWord.join(' ');
     }

     function deleteHotspot(id) {
        var data = {
            'id': id 
          };
        var config = {
            method: 'post',
            url: `${apiDomain}/hotspot/delete`,
            headers: { 
              'Accept': 'application/json', 
              'Authorization':  `Bearer ${ localStorage.getItem('token') }`,
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
              if (response.data['deleted'] == true) {
                  setShowMe(false);
              }
          })
          .catch(function (error) {
            console.log(error);
          });

        // editHandler();
     }

     function getDataFromAPI() {
        axios.get(`${heliumApiDomain}/hotspots/${address}`)
        .then(res => {
            handleLastActive(res.data.data.last_change_block, res.data.data.block);
        });
     }
    
    useEffect(() => {
        axios.get(`${heliumApiDomain}/hotspots/${address}`)
        .then(res => {
            handleHotspot(res.data.data);
            handleLastActive(res.data.data.last_change_block, res.data.data.block);
            axios.get(`${heliumApiDomain}/hotspots/${address}/rewards/sum?min_time=-30%20day&bucket=day`)
            .then(res => {
                let todaysEarnings = 0;
                let yesterday = 0;
                let sevenDay = 0;
                let thirtyDay = 0;

                let orig = res.data.data;
                orig.forEach(data => {
                    thirtyDay += (data.total);
                });
           
                let cutYesterday = res.data.data.shift();
                yesterday = cutYesterday.total;
            
                let cutSevenDay = res.data.data.slice(0,7);
                cutSevenDay.forEach(data => {
                    sevenDay += (data.total);
                });

                let minTime = new Date();
                let maxTime = new Date();
                minTime.setHours(-5,0,1,0);
                maxTime.setHours(18,59,59,0);
        
                var config = {
                    method: 'get',
                    url: `${heliumApiDomain}/hotspots/${address}/rewards?min_time=${minTime.toISOString()}&max_time=${maxTime.toISOString()}`,
                    headers: { }
                  };
                  
                  axios(config)
                  .then(function (response) {
                      let cursor = response.data['cursor'];
                      var config = {
                        method: 'get',
                        url: `${heliumApiDomain}/hotspots/${address}/rewards?min_time=${minTime.toISOString()}&max_time=${maxTime.toISOString()}&cursor=${cursor}`,
                        headers: { }
                      };
                      
                      axios(config)
                      .then(function (response) {
                        let dailyEarnings = response.data.data;
                        dailyEarnings.forEach(today => {
                            let amount = (today.amount / 100000000);
                            todaysEarnings += (parseFloat(amount));
                        });

                        handleEarnings(todaysEarnings, yesterday, sevenDay, thirtyDay);
                      })
                  })
                  
                axios.get(`${heliumApiDomain}/oracle/prices/current`)
                    .then(res => {
                        handleCurrentPrice(res.data.data['price']);
                         setTimeout(function() {
                            handleLoading();
                        }, delay * 1000);
                    })
                
            })

            const timerId = setInterval(() => {
                getDataFromAPI();
             }, 60000);
        })



        
    },[]);

    if (!loading) {
        if (showMe) {
            return (
                <section className="animate-fade-in-down">
                    <h2 className="text-2xl font-bold mt-6 font-Roboto font-medium xs:ml-5 xm:ml-0">
                    {
                        edit ? <FontAwesomeIcon icon={faTrash} className="mr-3 hover:cursor-pointer" size="xs" onClick={() => deleteHotspot(hotspotID)}/> : ''
                    }
                        <span className="hover:text-gray-600"><Link href={`/hotspot/${hotspot.address}`}>{capitalizeTheFirstLetterOfEachWord(hotspot.name.replace(/-/g, " "))}</Link></span>
                        { lastActive < 120 ? 
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200 uppercase ml-3">
                                <FontAwesomeIcon icon={faSatelliteDish} /> {lastActive} blocks
                            </span> :
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 uppercase ml-3">
                                <FontAwesomeIcon icon={faSatelliteDish} /> {lastActive} blocks
                            </span>
                        }

                    </h2>
                    <a href={`https://explorer.helium.com/hotspots/${hotspot.address}`}  target="_blank" rel="noreferrer" className="text-sm hover:text-gray-600 xs:ml-5 xm:ml-0"><FontAwesomeIcon icon={faGlobe} /> View on Explorer</a>
                    <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 font-Montserrat xs:hidden sm:grid">
                        <div className="md:mt-6 sm:mt-5">
                            <h3 className="text-2xl leading-relaxed">Today</h3>
                            <p>{(earningsToday).toFixed(2)}<sup className="align-text-middle">HNT</sup></p>
                            <p>${(earningsToday * currentPrice).toFixed(2)} <sup className="align-text-middle">USD</sup></p>
                        </div>
                        <div className="md:mt-6 sm:mt-5">
                            <h3 className="text-2xl leading-relaxed">Yesterday</h3>
                            <p>{(earningsYesterday).toFixed(2)}<sup className="align-text-middle">HNT</sup></p>
                            <p>${(earningsYesterday * currentPrice).toFixed(2)}<sup className="align-text-middle">USD</sup></p>
                        </div>
                        <div className="md:mt-6 sm:mt-5">
                            <h3 className="text-2xl leading-relaxed">7 Days</h3>
                            <p>{(earningsSevenDays).toFixed(2)} <sup className="align-text-middle">HNT</sup></p>
                            <p>${(earningsSevenDays * currentPrice).toFixed(2)}<sup className="align-text-middle">USD</sup></p>
                        </div>
                        <div className="md:mt-6sm:mt-5">
                            <h3 className="text-2xl leading-relaxed">30 Days</h3>
                            <p>{(earningsThirtyDays).toFixed(2)} <sup className="align-text-middle">HNT</sup></p>
                            <p>${(earningsThirtyDays * currentPrice).toFixed(2)} <sup className="align-text-middle">USD</sup></p>
                        </div>
                    </div>
                    <hr className="mt-6" />
                </section>
                )
            } else {
                return(
                   <></>
                )
            }
    } else { 
        return (
            <div className="relative pt-1 animate-pulse mt-10 h-48">
                <div className="flex mb-2 items-center justify-between">
                    <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                        Loading Hotspot Details...
                    </span>
                    </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
                </div>
            </div>
        )
    }
}

export default Earnings
