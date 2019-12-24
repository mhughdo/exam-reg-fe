import React, {useState} from 'react'
import {Avatar, Row, Col, Button, Menu, Dropdown, Icon} from 'antd'
import {useUserContext} from '../../User'
import './nav-right.styles.scss'
import SignOut from './sign-out.component'
import UploadFile from '../../Upload'

const NavRight = () => {
    const me = useUserContext()
    const [loading, setLoading] = useState(false)
    const [isDropdownVisible, setDropdownVisible] = useState(false)

    if (!me) return null

    const menu = (
        <Menu>
            <Menu.Item key='3'>
                <SignOut />
            </Menu.Item>
        </Menu>
    )

    const importMenu = (
        <Menu>
            <Menu.Item key='sessions'>
                <UploadFile setLoading={setLoading} fileName='sessions' />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='students'>
                <UploadFile setLoading={setLoading} fileName='students' />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='courses'>
                <UploadFile setLoading={setLoading} fileName='courses' />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='shifts'>
                <UploadFile setLoading={setLoading} fileName='shifts' />
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='rooms'>
                <UploadFile setLoading={setLoading} fileName='rooms' />
            </Menu.Item>
        </Menu>
    )

    return (
        <Row type='flex' justify='end'>
            {me?.userInfo?.name && (
                <>
                    {me?.userInfo?.userType === 'ADMIN' && (
                        <Col className=''>
                            <Dropdown overlay={importMenu} trigger={['click']}>
                                <Button type='primary' loading={loading} icon='import' className='button-import'>
                                    Import{loading && 'ing'}
                                </Button>
                            </Dropdown>
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
