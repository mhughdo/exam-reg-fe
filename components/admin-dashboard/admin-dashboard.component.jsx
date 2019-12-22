import React, {useState} from 'react'
import './admin-dashboard.styles.scss'
import {Tabs} from 'antd'
import SessionTable from './tables/session/session-table.component'
import CourseTable from './tables/course/course-table.component'
import StudentTable from './tables/student/student-table.component'
import ShiftTable from './tables/shift/shift-table.component'
import RoomTable from './tables/room/room-table.component'

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
                <TabPane tab='Student' key='Student'>
                    <StudentTable />
                </TabPane>
                <TabPane tab='Shift' key='Shift'>
                    <ShiftTable />
                </TabPane>
                <TabPane tab='Room' key='Room'>
                    <RoomTable />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Dashboard
