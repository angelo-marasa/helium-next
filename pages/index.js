import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'

//-- Components
import Navigation from '../components/Navigation';

export default function Home(props) {

  useEffect(() => {
    
    
  },[]);


  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Home Page
      </h1>
      <p>
        Nothing here yet, but coming soon! Ideas? Tell me.
      </p>
    </div>
  )
}
