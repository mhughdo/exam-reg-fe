import React from 'react'
import App from 'next/app'
import 'antd/dist/antd.css'

import Page from '../components/overall-layout/overall-layout.component'
import '../style/index.scss'
import PleaseSignIn from '../components/please-sign-in/please-sign-in.component'

class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
            // <PleaseSignIn>
            <Page>
                <Component {...pageProps} />
            </Page>
            // </PleaseSignIn>
        )
    }
}

export default MyApp
