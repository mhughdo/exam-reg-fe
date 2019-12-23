import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table, Result, Row, Col} from 'antd'
import useDynamicQuery from '../../hooks/useDynamicQuery'
import './session-detail.styles.scss'
import SessionDetailDownloader from './session-detail-downloader.component'

const SESSION = gql`
    query SESSION($query: SessionQueryInput!) {
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
                endTime
            }
            students {
                id
                studentID
                userInfo {
                    name
                }
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
        title: 'Student Name',
        dataIndex: 'studentName',
    },
    {
        title: 'Student ID',
        dataIndex: 'studentID',
    },
]

const SessionDetail = ({ssid}) => {
    const [students, setStudents] = useState(null)
    const [sessionInfo, setSessionInfo] = useState(null)
    const {data, loading} = useDynamicQuery({query: SESSION, variables: {query: {sessionID: ssid}}})

    useEffect(() => {
        if (!loading && data?.sessions.length) {
            const session = data.sessions[0]
            const transformedData = session.students.map((student, index) => {
                return {
                    key: student.id,
                    index: index + 1,
                    studentName: student.userInfo.name,
                    studentID: student.studentID,
                }
            })

            const ssInfo = {
                courseName: session.course.name,
                courseID: session.course.courseID,
                date: session.shift.date,
                startTime: session.shift.startTime,
                endTime: session.shift.endTime,
                roomID: session.room.roomID,
            }

            setSessionInfo(ssInfo)
            setStudents(transformedData)
        }
    }, [data, loading])

    if (!loading && !data?.sessions.length) {
        return <Result status='404' title='404' subTitle='Sorry, the session you are looking for does not exist.' />
    }
    return (
        <div className='session-detail container'>
            <h1>Session Detail</h1>
            {!loading && sessionInfo && (
                <Row type='flex' className='session-info'>
                    <Col span={12} className='course-info'>
                        <h4>Course Name: {sessionInfo?.courseName}</h4>
                        <h4>Course ID: {sessionInfo?.courseID}</h4>
                        <h4>Room ID: {sessionInfo?.roomID}</h4>
                    </Col>
                    <Col span={12}>
                        <div className='shift-info'>
                            <h4>Date: {sessionInfo?.date}</h4>
                            <h4>Start Time: {sessionInfo?.startTime}</h4>
                            <h4>End Time: {sessionInfo?.endTime}</h4>
                        </div>
                    </Col>
                </Row>
            )}

            <Table loading={loading} columns={columns} dataSource={students} pagination={false} />
            {!loading && sessionInfo && (
                <SessionDetailDownloader ssid={ssid} students={students} sessionInfo={sessionInfo} />
            )}
        </div>
    )
}

export default SessionDetail
