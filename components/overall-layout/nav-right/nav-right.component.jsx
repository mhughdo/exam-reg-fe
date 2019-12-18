import React from 'react'
import {Avatar, Row, Col, Button} from 'antd'
import {useUserContext} from '../../User'
import './nav-right.styles.scss'

const NavRight = () => {
    const me = useUserContext()

    if (!me) return null

    return (
        <Row type='flex' justify='end'>
            {me?.userInfo?.name && (
                <>
                    <Col className=''>
                        <Button type='primary' icon='import' className='button-import'>
                            Import
                        </Button>
                    </Col>
                    <Col className='user-info'>
                        <Avatar src='https://www.gravatar.com/avatar/fa14086884766aa268972e609d9d360a?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault1.png&amp' />
                        <span> {me?.userInfo?.name}</span>
                    </Col>
                </>
            )}
        </Row>
    )
}

export default NavRight
