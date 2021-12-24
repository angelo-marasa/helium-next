import React from 'react'
import Link from 'next/link';

const Authorized = () => {
    return (
        <>
        <li className="nav-item">
            <Link href="/dashboard">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <span className="ml-2">Dashboard</span>
                </a>
            </Link>
        </li>
        <li className="nav-item">
            <Link href="/hotspots">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <span className="ml-2">My Hotspots</span>
                </a>
            </Link>
        </li>
        <Link href="/logout">
            <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <span className="ml-2">Logout</span>
                </a>
            </li>
        </Link>
    </>
    )
}

export default Authorized
