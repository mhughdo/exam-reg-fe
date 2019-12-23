import React, {useState, useEffect} from 'react'
import {Layout, Menu, Icon} from 'antd'
import Header from './header.component'
import './overall-layout.styles.scss'
import Logo from '../../assets/shark.svg'
import {useUserContext} from '../User'
import Link from 'next/link'
import {useRouter} from 'next/router'

const {Sider, Content} = Layout

const OverallLayout = ({children}) => {
    const [isCollapsed, toggleCollapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState([])
    const me = useUserContext()

    const router = useRouter()
    const {pathname} = router

    useEffect(() => {
        if (pathname === '/') {
            setSelectedKeys(['dashboard'])
        } else if (pathname === '/schedule') {
            setSelectedKeys(['schedule'])
        } else {
            setSelectedKeys([])
        }
    }, [pathname])

    if (!me) return <>{children} </>

    return (
        <Layout hasSider style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={isCollapsed} onCollapse={() => toggleCollapsed(!isCollapsed)}>
                <div className='logo'>
                    <a href='/'>
                        <img src={Logo} alt='Logo' />
                    </a>
                </div>
                <Menu theme='dark' mode='inline' defaultSelectedKeys={['dashboard']} selectedKeys={selectedKeys}>
                    <Menu.Item key='dashboard'>
                        <Icon type='dashboard' />
                        <Link href='/' as='/'>
                            <span>Dashboard</span>
                        </Link>
                    </Menu.Item>
                    {me.userInfo.userType === 'USER' && (
                        <Menu.Item key='schedule'>
                            <Icon type='schedule' />
                            <Link href='/schedule' as='/schedule'>
                                <span>Schedule</span>
                            </Link>
                        </Menu.Item>
                    )}
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
