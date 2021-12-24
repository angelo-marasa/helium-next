import '../styles/globals.css'
import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation';

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState();

  function handleAuth(newVal) {
    setAuth(newVal);
  }

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      handleAuth(true);
    } 
},[]);


  return (
    <>
      <Navigation auth={auth} />  
      <div className="container mx-auto">
        
        <Component auth={auth} handler={handleAuth} {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
