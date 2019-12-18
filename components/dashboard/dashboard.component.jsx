import React, {useState} from 'react'
import './dashboard.styles.scss'
import {Tabs} from 'antd'
import SessionTable from '../tables/session/session-table.component'
import CourseTable from '../tables/course/course-table.component'

const {TabPane} = Tabs

const Dashboard = () => {
    const [tabHeader, setTabHeader] = useState('Session')

    return (
        <div className='dashboard container'>
            <div className='tab-header'>
                <h1>{tabHeader}</h1>
            </div>
            <Tabs defaultActiveKey='Session' onChange={key => setTabHeader(key)}>
                <TabPane tab='Session' key='Session'>
                    <SessionTable />
                </TabPane>
                <TabPane tab='Course' key='Course'>
                    <CourseTable />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Dashboard
