import React, {useMemo} from 'react'
import App from 'next/app'
import 'antd/dist/antd.css'

import Page from '../components/overall-layout/overall-layout.component'
import '../style/index.scss'
import {withApollo} from '../lib/apollo'
import redirect from '../lib/redirect'
import getUser from '../lib/getUser'
import {UserContext} from '../components/User'

function SubApp({children, me}) {
    const value = useMemo(() => {
        return me
    }, [me])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
class MyApp extends App {
    static async getInitialProps({Component, ctx}) {
        let pageProps = {}
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        // this exposes the query to the user
        pageProps.query = ctx.query

        const {data} = await getUser(ctx.apolloClient)

        if (data?.me?.userInfo) {
            pageProps.me = data.me
        }
        if (!data.me && ctx.pathname !== '/login') redirect(ctx, '/login')

        return {pageProps}
    }

    render() {
        const {Component, pageProps} = this.props
        const {me} = pageProps

        return (
            <SubApp me={me}>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </SubApp>
        )
    }
}

export default withApollo(MyApp)
