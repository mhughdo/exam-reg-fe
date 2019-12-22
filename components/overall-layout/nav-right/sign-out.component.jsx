import React, {useEffect} from 'react'
import gql from 'graphql-tag'
import {Button} from 'antd'
import useDynamicMutation from '../../../hooks/useDynamicMutation'
import './sign-out.styles.scss'

const SIGN_OUT = gql`
    mutation SIGN_OUT {
        signOut {
            message
        }
    }
`

const SignOut = () => {
    const {fn: signOut, data, loading} = useDynamicMutation({query: SIGN_OUT})

    useEffect(() => {
        if (!loading && data?.signOut?.message) {
            window.location.href = '/login'
        }
    }, [data, loading])

    return (
        <div className='sign-out'>
            <Button type='link' onClick={() => signOut()}>
                Sign Out
            </Button>
        </div>
    )
}

export default SignOut
