import React, {useState} from 'react'
import {Layout, Menu, Icon} from 'antd'
import '../style/layout.scss'

const {Header, Sider, Content} = Layout

const Page = ({children}) => {
    const [collapsed, toggleCollapsed] = useState(false)

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={() => toggleCollapsed(!collapsed)}>
                <div className='logo' />
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1'>
                        <Icon type='user' />
                        <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Icon type='video-camera' />
                        <span>nav 2</span>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Icon type='upload' />
                        <span>nav 3</span>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header style={{background: '#fff', padding: 0}}>
                    {/* <Icon className='trigger' type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} /> */}
                </Header>

                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: '#fff',
                        minHeight: 280,
                    }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default Page
