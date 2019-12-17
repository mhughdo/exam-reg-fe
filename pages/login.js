import React from 'react'
import LoginForm from '../components/login-form/login-form.component'
import redirect from '../lib/redirect'
import getUser from '../lib/getUser'

const Login = () => {
    return <LoginForm />
}

Login.getInitialProps = async ctx => {
    const {data} = await getUser(ctx.apolloClient)

    if (data.me) {
        redirect(ctx, '/')
    }

    return {}
}

export default Login
