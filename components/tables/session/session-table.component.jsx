import React, {useState, useEffect} from 'react'
import {Table} from 'antd'
import gql from 'graphql-tag'
import useDynamicQuery from '../../../hooks/useDynamicQuery'

const ALL_SESSIONS = gql`
    query getAllSessions {
        sessions {
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
            students {
                id
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
        title: 'Course Name',
        dataIndex: 'courseName',
        // key: 'course-name',
        // sorter: true,
        // render: name => `${name.first} ${name.last}`,
        // width: '20%',
    },
    {
        title: 'Course ID',
        dataIndex: 'courseID',
        // key: 'course-id',
        // filters: [{text: 'Male', value: 'male'}, {text: 'Female', value: 'female'}],
        // width: '20%',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        // key: 'date',
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        // key: 'start-time',
    },
    {
        title: 'Students',
        dataIndex: 'students',
    },
    {
        title: 'Room ID',
        dataIndex: 'roomID',
    },
]

const SessionTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_SESSIONS})
    const [transformedData, setTransformedData] = useState(null)

    const transformData = data => {
        if (!data) {
            setTransformedData([])
        }
        const result = data.map(item => {
            return {
                key: item.id,
                courseName: item.course.name,
                courseID: item.course.courseID,
                date: item.shift.date,
                startTime: item.shift.startTime,
                students: item.students.length,
                roomID: item.room.roomID,
            }
        })
        setTransformedData(result)
    }

    useEffect(() => {
        if (data?.sessions.length) {
            transformData(data.sessions)
        }
    }, [data])

    return <Table loading={loading} columns={columns} dataSource={transformedData || null} />
}

export default SessionTable
