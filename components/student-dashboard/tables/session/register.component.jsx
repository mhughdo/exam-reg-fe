import React, {useEffect} from 'react'
import gql from 'graphql-tag'
import {Button, message} from 'antd'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'

const REGISTER_SESSION = gql`
    mutation registerToSession($id: ID!, $studentID: String!) {
        registerToSession(id: $id, studentID: $studentID) {
            id
        }
    }
`

const Register = ({id, studentID = '', isDisable}) => {
    const {fn: register, data, loading} = useDynamicMutation({query: REGISTER_SESSION})
    useEffect(() => {
        if (data?.registerToSession) {
            message.success('Registered succesfully!')
        }
    }, [data])

    return (
        <Button
            type='primary'
            loading={loading}
            disabled={isDisable}
            onClick={() => register({variables: {id, studentID}, refetchQueries: ['getAllSessions']})}>
            Register
        </Button>
    )
}

export default Register
