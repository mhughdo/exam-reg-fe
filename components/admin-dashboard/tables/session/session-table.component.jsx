import React, {useState, useEffect, useCallback} from 'react'
import { Table, Divider} from 'antd'
import gql from 'graphql-tag'
import Link from 'next/link'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'
import './session-table.styles.scss'

const ALL_SESSIONS_ADMIN = gql`
    query ALL_SESSIONS_ADMIN {
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
                studentID
            }
            room {
                id
                roomID
                totalPC
            }
        }
    }
`

const SessionTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_SESSIONS_ADMIN})
    const [transformedData, setTransformedData] = useState(null)

    const columns = [
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            render: (text, record) => (
                <Link href='/session/[ssid]' as={`/session/${record.key}`}>
                    <a>{record.courseName}</a>
                </Link>
            ),
            sorter: (a, b) => a.courseName > b.courseName,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Course ID',
            dataIndex: 'courseID',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            // TODO might need to fix
            sorter: (a, b) => a.date > b.date,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
        },
        {
            title: 'Students',
            dataIndex: 'students',
        },
        {
            title: 'Room ID',
            dataIndex: 'roomID',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <a>Edit</a>
                    <Divider type='vertical' />
                    <a>Delete</a>
                </>
            ),
        },
    ]

    const transformData = useCallback(data => {
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
                students: `${item.students.length}/${item.room.totalPC}`,
                roomID: item.room.roomID,
            }
        })
        setTransformedData(result)
    }, [])

    useEffect(() => {
        if (data?.sessions.length) {
            transformData(data.sessions)
        }
    }, [data, transformData])

    return <Table loading={loading} columns={columns} dataSource={transformedData || null} />
}

export default SessionTable
