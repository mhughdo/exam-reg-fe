import React from 'react'
import Head from 'next/head'
import LoginForm from '../components/login-form/login-form.component'
import redirect from '../lib/redirect'
import getUser from '../lib/getUser'

const Login = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <LoginForm />
        </>
    )
}

Login.getInitialProps = async ctx => {
    const {data} = await getUser(ctx.apolloClient)

    if (data.me) {
        redirect(ctx, '/')
    }

    return {}
}

export default Login
