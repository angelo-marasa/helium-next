import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import Link from 'next/link';

import LoginErr from '../components/Loginerror';

const API_URL = "https://helium-backend.loc/api/";

export default function Login(props) {
    const router = useRouter();
    let [ email, setEmail ] = useState('');
    let [ password, setPassword ] = useState('');
    let [ loginError, setLoginError ] = useState(false);

    let login_token = null;

    const updateLoginError = () => {
        setLoginError(true);
    }

    const updateAuth = () => {
        props.handler(true);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push({
                pathname: '/dashboard',
                //query: { from: router.pathname },
          })
        } 
    },[]);

    const submitLogin = async (e) => {
        e.preventDefault();
        
        let data = new FormData();
        data.append( 'email', email );
        data.append( 'password', password );

        axios({
            method: 'post',
            url: API_URL+'login',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (resp) {
                let response = resp.data;
                login_token = response['access_token'];
                localStorage.setItem("token", response['access_token']);
                localStorage.setItem("uId", response['user']['id']);
                localStorage.setItem("auth", true);
                updateAuth();
                router.push({
                    pathname: '/dashboard',
                    //query: { from: router.pathname },
                })
            })
            .catch(function (response) {
                //handle error
                updateLoginError();
            });
    }

    return (
            <div className="text-center text-gray-800 flex flex-col justify-center items-center">
            
                <h1 className="mt-6 text-4xl font-bold text-center text-gray-900">Login</h1>
                
                <div className="text-sm text-gray-800">
                    Helium Hotspot Monitor
                </div>
            
            
                <form className="mt-6 sm:w-96 mt-40" 
                        onSubmit={ ( e ) => submitLogin( e ) } 
                        action="" 
                        method="post"
                >
                    <input type="email" 
                            onInput={ ( e ) => setEmail( e.target.value ) }
                            id="email" 
                            className="block w-full h-10 px-3 mt-1 text-sm bg-gray-50 border border-gray-300 rounded-md ring-gray-300 ring-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500 shadow-sm" 
                            placeholder="Email address"
                            value={ email }/>
                    <input type="password" 
                            onInput={ ( e ) => setPassword( e.target.value ) }
                            id="password" 
                            className="block w-full h-10 px-3 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-md ring-gray-300 ring-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500 shadow-sm" 
                            placeholder="Password" 
                            autoComplete="current-password"
                            value={ password }/>
                        {
                            loginError ? <LoginErr /> : ''
                        }
                    <div className="flex flex-col mt-6">
                        <button className="w-full h-10 px-20 py-2 mt-6 text-sm font-bold text-white bg-yellow-500 rounded-md hover:bg-opacity-90">
                            Login
                        </button>
                    </div>
                </form>
                <div className="mt-5 text-sm text-center">
                    Not a member? <Link href="/register"><a className="text-yellow-900">Register</a></Link>
                </div>
            </div>
    )

}