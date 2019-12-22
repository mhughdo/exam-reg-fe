import React from 'react'
import Head from 'next/head'
import StudentDashboard from '../components/student-dashboard/student-dashboard.component'
import AdminDashboard from '../components/admin-dashboard/admin-dashboard.component'
import {useUserContext} from '../components/User'

const Home = () => {
    const me = useUserContext()

    return (
        <div>
            <Head>
                <title>Dashboard</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            {me?.userInfo?.userType === 'USER' && <StudentDashboard />}
            {me?.userInfo?.userType === 'ADMIN' && <AdminDashboard />}
        </div>
    )
}

export default Home
