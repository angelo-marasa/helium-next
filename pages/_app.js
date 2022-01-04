import '../styles/globals.css'
import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation';

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState();
  const [apiDomain, setApiDomain] = useState('https://helium-geek-replica-backend.herokuapp.com/api');
  const [heliumApiDomain, setHeliumApiDomain] = useState('https://helium-api.stakejoy.com/v1');

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
        
        <Component auth={auth} handler={handleAuth} apiDomain={apiDomain} heliumApiDomain={heliumApiDomain} {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
