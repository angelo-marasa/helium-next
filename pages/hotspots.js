import React, { useEffect, useState } from 'react'

const hotspots = (props) => {
    useEffect(() => {
        console.log(props);
    },[]);
    return (
        <h1 className="text-3xl font-bold underline">
            Hotspots
        </h1>
    )
}

export default hotspots
