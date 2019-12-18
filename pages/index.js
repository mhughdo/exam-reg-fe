import React from 'react'
import Head from 'next/head'
import Dashboard from '../components/dashboard/dashboard.component'

const Home = () => {
    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Dashboard />
        </div>
    )
}

export default Home
