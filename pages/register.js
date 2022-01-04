import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = "https://helium-backend.loc/api/";


const Register = (props) => {
    const router = useRouter();

    let [ email, setEmail ] = useState('');
    let [ password, setPassword ] = useState('');
    let [ confirmPassword, setConfirmPassword ] = useState('');
    let [ yourname, setYourname ] = useState('');
    let [ regError, setRegError ] = useState(false);
    let [ regErrorMsg, setRegErrorMsg ] = useState('');
    let login_token = null;


    const updateRegError = (errMsg) => {
        setRegError(true);
        setRegErrorMsg(errMsg);
    }

    const updateAuth = () => {
        props.handler(true);
    }

    const submitRegister = async (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append( 'name', yourname );
        data.append( 'email', email );
        data.append( 'password', password );
        data.append( 'password_confirmation', confirmPassword );

        axios({
            method: 'post',
            url: props.apiDomain+'/register',
            data: data,
            config: { headers: {'Accept': 'application/json' }}
            })
            .then(function (resp) {
                let response = resp.data;

                if ( response['err'] == true) {
                    updateRegError(response['message'])
                    return;
                }

                login_token = response['access_token'];
                localStorage.setItem("token", response['access_token']);
                localStorage.setItem("uId", response['user']['id']);
                localStorage.setItem("auth", true);
                updateAuth();
                router.push({
                    pathname: '/',
                    //query: { from: router.pathname },
                })
            })
            .catch(function (resp) {

            });
    } 

    return (
        <div className="text-center text-gray-800 flex flex-col justify-center items-center">
            <h1 className="mt-6 text-4xl font-bold text-center text-gray-900">Register an Account</h1>
            <p className="mt-5 w-6/12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                <form className="mt-6 sm:w-96 mt-40" 
                        onSubmit={ ( e ) => submitRegister( e ) } 
                        action="" 
                        method="post"
                >
                    {
                        regError ? <p className='mb-5'>{regErrorMsg}</p> : ''
                    }
                <input type="text" 
                            onInput={ ( e ) => setYourname( e.target.value ) }
                            id="yourname" 
                            className="block w-full h-10 px-3 mt-1 text-sm bg-gray-50 border border-gray-300 rounded-md ring-gray-300 ring-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500 shadow-sm" 
                            placeholder="Your Name"/>
                    <input type="email" 
                            onInput={ ( e ) => setEmail( e.target.value ) }
                            id="email" 
                            className="block w-full h-10 px-3 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-md ring-gray-300 ring-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500 shadow-sm" 
                            placeholder="Email address"/>
                    <input type="password" 
                            onInput={ ( e ) => setPassword( e.target.value ) }
                            id="password" 
                            className="block w-full h-10 px-3 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-md ring-gray-300 ring-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500 shadow-sm" 
                            placeholder="Password" 
                            autoComplete="current-password"/>
                    <input type="password" 
                            onInput={ ( e ) => setConfirmPassword( e.target.value ) }
                            id="confirmPassword" 
                            className="block w-full h-10 px-3 mt-2 text-sm bg-gray-50 border border-gray-300 rounded-md ring-gray-300 ring-opacity-50 focus:outline-none focus:bg-white focus:border-gray-500 shadow-sm" 
                            placeholder="Confirm Password" 
                            autoComplete="current-password"/>
                      
                    <div className="flex flex-col mt-6">
                        <button className="w-full h-10 px-20 py-2 mt-6 text-sm font-bold text-white bg-yellow-500 rounded-md hover:bg-opacity-90">
                            Register
                        </button>
                    </div>
                </form>
                <div className="mt-5 text-sm text-center">
                    Already a member? <Link href="/login"><a className="text-yellow-900">Login</a></Link>
                </div>

        </div>
    )
}

export default Register
