import React from 'react'
import Head from 'next/head'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Nav from '../components/nav'

const ALL_STUDENTS = gql`
    query Students {
        students {
            id
            studentID
            name
            courses {
                name
            }
        }
    }
`

const Home = () => {
    // const {data, loading, error} = useQuery(ALL_STUDENTS)

    // if (loading) return <p>Loading</p>

    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
            
            {/* {data.students.map(student => (
                <div key={student.id}>{student.name}</div>
            ))} */}
        </div>
    )
}

export default Home
