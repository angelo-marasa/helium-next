import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';

const Earnings = ({address, delay}) => {
    const [loading, setLoading] = useState(true);
    const [hotspot, setHotspot] = useState();
    const [earningsToday, setEarningsToday] = useState();
    const [earningsYesterday, setEarningsYesterday] = useState();
    const [earningsSevenDays, setEarningsSevenDays] = useState();
    const [earningsThirtyDays, setEarningsThirtyDays] = useState();
    const [currentPrice, setCurrentPrice] = useState();

    function handleLoading() {
        setLoading(false);
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
    
    useEffect(() => {
        axios.get(`https://helium-api.stakejoy.com/v1/hotspots/${address}`)
        .then(res => {
            handleHotspot(res.data.data);
            
            axios.get(`https://api.helium.io/v1/hotspots/${address}/rewards/sum?min_time=-30%20day&bucket=day`)
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
                    url: `https://helium-api.stakejoy.com/v1/hotspots/${address}/rewards?min_time=${minTime.toISOString()}&max_time=${maxTime.toISOString()}`,
                    headers: { }
                  };
                  
                  axios(config)
                  .then(function (response) {
                      let cursor = response.data['cursor'];
                      var config = {
                        method: 'get',
                        url: `https://helium-api.stakejoy.com/v1/hotspots/${address}/rewards?min_time=${minTime.toISOString()}&max_time=${maxTime.toISOString()}&cursor=${cursor}`,
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
                  
                axios.get(`https://helium-api.stakejoy.com/v1/oracle/prices/current`)
                    .then(res => {
                        handleCurrentPrice(res.data.data['price']);
                         setTimeout(function() {
                            handleLoading();
                        }, delay * 1000);
                    })
                
            })
        })



        
    },[]);

    if (!loading) {
    return (
        <section className="animate-fade-in-down">
            <h2 className="text-2xl font-bold mt-10 font-Roboto font-medium">
                <Link href={`/hotspot/${hotspot.address}`}>{capitalizeTheFirstLetterOfEachWord(hotspot.name.replace(/-/g, " "))}</Link>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200 uppercase first: ml-3 last:mr-0 mr-1">
                    Home
                </span>
            </h2>

            <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 font-Montserrat">
                <div className="md:mt-10 sm:mt-5">
                    <h3 className="text-2xl leading-relaxed">Today</h3>
                    <p>{earningsToday.toFixed(2)}<sup className="align-text-middle">HNT</sup></p>
                    <p>${(earningsToday * currentPrice).toFixed(2)} <sup className="align-text-middle">USD</sup></p>
                </div>
                <div className="md:mt-10 sm:mt-5">
                    <h3 className="text-2xl leading-relaxed">Yesterday</h3>
                    <p>{earningsYesterday.toFixed(2)}<sup className="align-text-middle">HNT</sup></p>
                    <p>${(earningsYesterday * currentPrice).toFixed(2)}<sup className="align-text-middle">USD</sup></p>
                </div>
                <div className="md:mt-10 sm:mt-5">
                    <h3 className="text-2xl leading-relaxed">7 Days</h3>
                    <p>{earningsSevenDays.toFixed(2)} <sup className="align-text-middle">HNT</sup></p>
                    <p>${(earningsSevenDays * currentPrice).toFixed(2)}<sup className="align-text-middle">USD</sup></p>
                </div>
                <div className="md:mt-10 sm:mt-5">
                    <h3 className="text-2xl leading-relaxed">30 Days</h3>
                    <p>{earningsThirtyDays.toFixed(2)} <sup className="align-text-middle">HNT</sup></p>
                    <p>${(earningsThirtyDays * currentPrice).toFixed(2)} <sup className="align-text-middle">USD</sup></p>
                </div>
            </div>
            <hr className="mt-10" />
        </section>
        )
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
