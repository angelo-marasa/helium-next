import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const Navigation = (props) => {

    useEffect(() => {

    },[]);

    function Auth() {
        if (props.auth == true) {
            return (
                <li>
                    <Link href="/logout">Logout</Link>
                </li>   
            )
        } else {
            return (
                <li>
                    <Link href="/login">Login</Link>
                </li>
            )
        }
    }

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/hotspots">Hotspots</Link>
                </li>
                {Auth()}
            </ul>
        </nav>
    )
}

export default Navigation
