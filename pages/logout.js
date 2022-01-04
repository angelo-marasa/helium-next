import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

const API_URL = "https://helium-backend.loc/api/";
const logout = (props) => {
    const router = useRouter();

    const updateAuth = () => {
        props.handler(false);
    }


    useEffect(() => {
        const headers = {
            "Authorization" : `Bearer ${ localStorage.getItem('token') }`
        };

        let result = axios( {
            method:'post',
            url: '/logout',
            baseURL: props.apiDomain,
            data: JSON.stringify({}),
            headers: headers,
        } );

        let response = result.data;
        updateAuth();
        localStorage.removeItem("token")
        localStorage.removeItem("uId")
        localStorage.removeItem("auth")
        router.push({
            pathname: '/login',
            //query: { from: router.pathname },
      })
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default logout
