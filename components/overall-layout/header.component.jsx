import React from 'react'
import {Layout, Input, Row, Col} from 'antd'
import User from './user/user.component'

const {Header} = Layout

const HeaderComponent = () => {
    return (
        <Header>
            {/* <Icon className='trigger' type={isCollapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggleCollapsed} /> */}
            <Row type='flex'>
                <Col span={16} className='nav-wrapper-left'>
                    <span className='ti-search' />
                    <Input
                        placeholder='Search by course, student name, session, shift of room'
                        onChange={value => console.log(value)}
                        className='input--search'
                    />
                </Col>
                <Col span={8} className='nav-wrapper-right'>
                    <User />
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderComponent
