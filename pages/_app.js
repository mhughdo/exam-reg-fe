import React from 'react'
import App from 'next/app'
import {ApolloProvider} from '@apollo/react-hooks'
import 'antd/dist/antd.css'
import withData from '../lib/apollo-client'
// import withData from '../lib/withApollo'
import Page from '../components/overall-layout/overall-layout.component'
import '../style/index.scss'

class MyApp extends App {
    render() {
        const {Component, pageProps, apollo} = this.props
        return (
            <ApolloProvider client={apollo}>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </ApolloProvider>
        )
    }
}

export default withData(MyApp)
