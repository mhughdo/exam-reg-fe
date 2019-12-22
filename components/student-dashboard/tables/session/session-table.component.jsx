import React, {useState, useEffect, useCallback} from 'react'
import {Table} from 'antd'
import gql from 'graphql-tag'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'
import Register from './register.component'
import UnRegister from './unregister.component'
import {useUserContext} from '../../../User'

const ALL_SESSIONS = gql`
    query getAllSessions {
        sessions {
            id
            course {
                id
                name
                courseID
                students {
                    studentID
                }
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
    const {data, loading} = useDynamicQuery({query: ALL_SESSIONS})
    const [transformedData, setTransformedData] = useState(null)
    const me = useUserContext()

    const columns = [
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            filters: [
                {
                    text: 'Available',
                    value: 'available',
                },
                {
                    text: 'Registered',
                    value: 'registered',
                },
            ],
            onFilter: (value, record) => {
                if (value === 'available') {
                    return record.isEligible
                }
                if (value === 'registered') {
                    return record.isRegister
                }
            },
            sorter: (a, b) => a.courseName > b.courseName,
            sortDirections: ['descend', 'ascend'],

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
            // TODO might need to fix
            sorter: (a, b) => a.date > b.date,
            sortDirections: ['descend', 'ascend'],
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
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) =>
                record.isRegister ? (
                    <UnRegister id={record.key} studentID={me?.studentID} />
                ) : (
                    <Register id={record.key} studentID={me?.studentID} />
                ),
        },
    ]

    const isRegister = useCallback(
        session => {
            return session.students.find(student => student.studentID === me?.studentID)
        },
        [me]
    )

    const isEligible = useCallback(
        session => {
            return session.course.students.find(student => student.studentID === me?.studentID)
        },
        [me]
    )

    const transformData = useCallback(
        data => {
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
                    isRegister: isRegister(item),
                    isEligible: isEligible(item),
                }
            })
            setTransformedData(result)
        },
        [isEligible, isRegister]
    )

    useEffect(() => {
        if (data?.sessions.length) {
            transformData(data.sessions)
        }
    }, [data, transformData])

    return <Table loading={loading} columns={columns} dataSource={transformedData || null} />
}

export default SessionTable
