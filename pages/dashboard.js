import React from 'react'
import Earnings from '../components/Hotspots/Earnings';

const Dashboard = () => {
    const address = '112c2h3HomJMiiCSh2rUcw9cprSudj4c9Hjdz6cvC8q6X45YAv1C';
    return (
        <>
        <h1 className="text-3xl font-bold">
            My Dashboard
        </h1>

        <Earnings address={address} delay='2'/>
        <Earnings address='11fX1eRdkqd1wfqgFExaWCcZ7qnEBVY6WzgXwHASx8mfrwbDAF3' delay='2.4'/>
        <Earnings address='11kJkRuHTFp9LgZaAg7PWHWY473th6m9A6sp8n6W6cHd67X1btL' delay='2.8'/>
        </>
    )
}

export default Dashboard
