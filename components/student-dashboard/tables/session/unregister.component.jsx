import React, {useEffect} from 'react'
import gql from 'graphql-tag'
import {Button, message} from 'antd'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'

const UNREGISTER_SESSION = gql`
    mutation unregisterFromSession($id: ID!, $studentID: String!) {
        unregisterFromSession(id: $id, studentID: $studentID) {
            id
        }
    }
`

const UnRegister = ({id, studentID = ''}) => {
    const {fn: unregister, data, loading} = useDynamicMutation({query: UNREGISTER_SESSION})
    useEffect(() => {
        if (data?.unregisterFromSession) {
            message.success('Unregistered succesfully!')
        }
    }, [data])

    return (
        <Button
            type='danger'
            loading={loading}
            onClick={() => unregister({variables: {id, studentID}, refetchQueries: ['getAllSessions']})}>
            UnRegister
        </Button>
    )
}

export default UnRegister
