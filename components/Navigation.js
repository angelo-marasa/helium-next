import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Authorized from '../components/Navigation/Authorized'
import Unathorized from '../components/Navigation/Unathorized'
import Search from '../components/Navigation/search'

const Navigation = (props) => {

    useEffect(() => {

    },[]);

    function Auth() {
        if (props.auth == true) {
            return (
                <Authorized />
            )
        } else {
            return (
                <Unathorized />            )
        }
    }

    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-yellow-500 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                    <Link href="/">
                        <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
                            HG-Replica
                        </a>
                </Link>
                <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
                    <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                    <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                </button>
                </div>
                <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
                <ul className="flex flex-col lg:flex-row list-none mr-auto">
                    {Auth()}
                </ul>
                <div className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
                    <div className="flex">
                    <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-blueGray-600 rounded-full text-sm bg-white items-center rounded-r-none pl-2 py-1 text-blueGray-800 border-r-0 placeholder-blueGray-300">
                    <FontAwesomeIcon icon={faSearch} />
                    </span>
                    </div>
                    <Search />
                </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
