import React from 'react'
import gql from 'graphql-tag'
import {Avatar, Row, Col, Button, message} from 'antd'
import {useQuery} from '@apollo/react-hooks'
import './user.styles.scss'

const ME = gql`
    query fecthUser {
        me {
            userInfo {
                name
            }
        }
    }
`

const User = () => {
    const {data, loading, error} = useQuery(ME)

    if (loading) return null

    if (error) return message.error('Error fetching user!')

    return (
        <Row type='flex' justify='end'>
            {data?.me?.userInfo?.name && (
                <>
                    <Col className=''>
                        <Button type='primary' icon='import' className='button-import'>
                            Import
                        </Button>
                    </Col>
                    <Col className='user-info'>
                        <Avatar src='https://www.gravatar.com/avatar/fa14086884766aa268972e609d9d360a?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault1.png&amp' />
                        <span> {data?.me?.userInfo?.name}</span>
                    </Col>
                </>
            )}
        </Row>
    )
}

export default User
