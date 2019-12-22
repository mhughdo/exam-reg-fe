import React, {useState} from 'react'
import {Avatar, Row, Col, Button, Menu, Dropdown, Icon} from 'antd'
import {useUserContext} from '../../User'
import './nav-right.styles.scss'
import SignOut from './sign-out.component'

const NavRight = () => {
    const me = useUserContext()
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    if (!me) return null

    const menu = (
        <Menu>
            <Menu.Item key='3'>
                <SignOut />
            </Menu.Item>
        </Menu>
    )

    return (
        <Row type='flex' justify='end'>
            {me?.userInfo?.name && (
                <>
                    {me?.userInfo?.userType === 'ADMIN' && (
                        <Col className=''>
                            <Button type='primary' icon='import' className='button-import'>
                                Import
                            </Button>
                        </Col>
                    )}
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        onVisibleChange={visible => setDropdownVisible(visible)}>
                        <Col className='user-info'>
                            <Avatar src='https://www.gravatar.com/avatar/fa14086884766aa268972e609d9d360a?default=https%3A%2F%2Fcloud.digitalocean.com%2Favatars%2Fdefault1.png&amp' />
                            <span className='user-info--name'> {me?.userInfo?.name}</span>
                            {isDropdownVisible ? (
                                <Icon type='up' style={{fontSize: '12px', color: '#bbb'}} />
                            ) : (
                                <Icon type='down' style={{fontSize: '12px', color: '#bbb'}} />
                            )}
                        </Col>
                    </Dropdown>
                </>
            )}
        </Row>
    )
}

export default NavRight
