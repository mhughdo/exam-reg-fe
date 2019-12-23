import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table} from 'antd'
import useDynamicQuery from '../../hooks/useDynamicQuery'
import {useUserContext} from '../User'
import './schedule.styles.scss'
import ScheduleDownloader from './schedule-downloader.component'

const SESSION_BY_STUDENT = gql`
    query SESSION_BY_STUDENT($query: SessionQueryInput!) {
        sessions(query: $query) {
            id
            course {
                id
                name
                courseID
            }
            shift {
                id
                date
                startTime
            }
            room {
                id
                roomID
            }
        }
    }
`

const columns = [
    {
        title: '#',
        dataIndex: 'index',
    },
    {
        title: 'Course Name',
        dataIndex: 'courseName',
    },
    {
        title: 'Course ID',
        dataIndex: 'courseID',
    },
    {
        title: 'Date',
        dataIndex: 'date',
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
    },
    {
        title: 'Room ID',
        dataIndex: 'roomID',
    },
]

const Schedule = () => {
    const me = useUserContext()
    const [schedule, setSchedule] = useState(null)
    const {data, loading} = useDynamicQuery({query: SESSION_BY_STUDENT, variables: {query: {studentID: me?.studentID}}})

    useEffect(() => {
        if (!loading && data?.sessions) {
            const {sessions} = data
            const schedule = sessions.map((session, index) => {
                return {
                    key: session.id,
                    index: index + 1,
                    courseName: session.course.name,
                    courseID: session.course.courseID,
                    date: session.shift.date,
                    startTime: session.shift.startTime,
                    roomID: session.room.roomID,
                }
            })
            setSchedule(schedule)
        }
    }, [data, loading])

    return (
        <div className='schedule container'>
            <h1>PHIẾU BÁO DỰ THI</h1>
            <div className='student-info'>
                <h4>Name: {me?.userInfo.name}</h4>
                <h4>Student ID: {me?.studentID}</h4>
            </div>

            <Table columns={columns} dataSource={schedule} loading={loading} pagination={false} />
            {!loading && schedule && <ScheduleDownloader me={me} schedule={schedule} />}
        </div>
    )
}

export default Schedule
