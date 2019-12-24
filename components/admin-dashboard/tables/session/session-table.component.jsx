import React, {useState, useEffect, useCallback} from 'react'
import {Table, Divider, Popconfirm} from 'antd'
import gql from 'graphql-tag'
import Link from 'next/link'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'
import './session-table.styles.scss'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'
import SessionUpdate from './session-update.component'
import {useLocalStateContext} from '../../../../hooks/useLocalState'

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
                shiftID
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

const SESSION_DELETE = gql`
    mutation SESSION_DELETE($id: ID!) {
        deleteSession(id: $id) {
            id
        }
    }
`

const SessionTable = () => {
    const {data, loading, refetch} = useDynamicQuery({query: ALL_SESSIONS_ADMIN})
    const [transformedData, setTransformedData] = useState(null)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [currentSession, setCurrentSession] = useState(null)
    const {fn: deleteSession} = useDynamicMutation({query: SESSION_DELETE, successMsg: 'Deleted session successfully'})
    const {globalLoading} = useLocalStateContext()

    const columns = [
        {
            title: 'Course Name',
            dataIndex: 'courseName',
            // eslint-disable-next-line react/display-name
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
            // eslint-disable-next-line react/display-name
            render: (text, record) => (
                <>
                    <a
                        onClick={() => {
                            setUpdateModalOpen(true)
                            setCurrentSession(record.key)
                        }}>
                        Edit
                    </a>
                    <Divider type='vertical' />
                    <Popconfirm
                        title='Sure to delete?'
                        onConfirm={() =>
                            deleteSession({variables: {id: record.key}, refetchQueries: ['ALL_SESSIONS_ADMIN']})
                        }>
                        <a>Delete</a>
                    </Popconfirm>
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

        if (globalLoading) {
            refetch()
        }
    }, [data, transformData, globalLoading, refetch])

    return (
        <>
            <Table loading={loading} columns={columns} dataSource={transformedData || null} />
            {!loading && data?.sessions && (
                <SessionUpdate
                    data={data?.sessions.find(session => session.id === currentSession)}
                    visible={updateModalOpen}
                    setUpdateModalOpen={setUpdateModalOpen}
                />
            )}
        </>
    )
}

export default SessionTable
