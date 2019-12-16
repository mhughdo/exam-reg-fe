import React from 'react'
import Head from 'next/head'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {withApollo} from '../lib/apollo'

const ME = gql`
    query me {
        me {
            userInfo {
                name
            }
        }
    }
`

const Home = () => {
    const {data} = useQuery(ME)

    console.log(data)

    return (
        <div>
            <Head>
                <title>Home</title>
                <link rel='icon' href='/favicon.ico' />
            </Head>
        </div>
    )
}

export default withApollo(Home)
