import React from 'react'
import Link from 'next/link';

const Unathorized = () => {
    return (
        <>
            <Link href="/login">
                <li className="nav-item">
                    <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                        <span className="ml-2">Login</span>
                    </a>
                </li>
            </Link>

            <Link href="/register">
            <li className="nav-item">
                <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <span className="ml-2">Register</span>
                </a>
            </li>
            </Link>
        </>
    )
}

export default Unathorized
