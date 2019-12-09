import React, {useState} from 'react'
import {Layout, Menu, Icon} from 'antd'
import Header from './header.component'
import './overall-layout.styles.scss'
import Logo from '../../assets/shark.svg'

const {Sider, Content} = Layout

const OverallLayout = ({children}) => {
    const [isCollapsed, toggleCollapsed] = useState(false)

    return (
        <Layout hasSider style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={isCollapsed} onCollapse={() => toggleCollapsed(!isCollapsed)}>
                <div className='logo'>
                    <img src={Logo} alt='Logo' />
                </div>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
                    <Menu.Item key='1'>
                        <Icon type='dashboard' />
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Icon type='user' />
                        <span>Profile</span>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Icon type='schedule' />
                        <span>Schedule</span>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Icon type='compass' />
                        <span>Manage</span>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Header />
                <Content>{children}</Content>
            </Layout>
        </Layout>
    )
}

export default OverallLayout
