import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table, Divider, Popconfirm} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'
import StudentUpdate from './student-update.component'
import {useLocalStateContext} from '../../../../hooks/useLocalState'

const ALL_STUDENTS = gql`
    query ALL_STUDENTS {
        students {
            id
            studentID
            userInfo {
                id
                name
                email
            }
            courses {
                id
                courseID
            }
            nonEligibleCourses {
                id
                courseID
            }
        }
    }
`

const STUDENT_DELETE = gql`
    mutation STUDENT_DELETE($studentID: String!) {
        deleteStudent(studentID: $studentID) {
            id
        }
    }
`

const StudentTable = () => {
    const {data, loading, refetch} = useDynamicQuery({query: ALL_STUDENTS})
    const [students, setStudents] = useState(null)
    const {fn: deleteStudent} = useDynamicMutation({
        query: STUDENT_DELETE,
        successMsg: 'Deleted student successfully',
    })
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [currentStudent, setCurrentStudent] = useState(null)
    const {globalLoading} = useLocalStateContext()

    useEffect(() => {
        if (!data) return setStudents(null)

        if (data.students.length) {
            const transformedData = data.students.map(student => {
                return {
                    key: student.id,
                    studentName: student.userInfo.name,
                    studentID: student.studentID,
                    studentEmail: student.userInfo.email,
                    courses: student.courses.length,
                    nonEligibleCourses: student.nonEligibleCourses.length,
                    rawCourses: student.courses,
                    rawNonEligibleCourses: student.nonEligibleCourses,
                }
            })
            setStudents(transformedData)
        }

        if (globalLoading) {
            refetch()
        }
    }, [data, globalLoading, refetch])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'studentName',
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
        },
        {
            title: 'Email',
            dataIndex: 'studentEmail',
        },
        {
            title: 'Courses',
            dataIndex: 'courses',
        },
        {
            title: 'Non Eligible Courses',
            dataIndex: 'nonEligibleCourses',
            width: '10%',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <span>
                    <a
                        onClick={() => {
                            setUpdateModalOpen(true)
                            setCurrentStudent(record.studentID)
                        }}>
                        Edit
                    </a>
                    <Divider type='vertical' />
                    <Popconfirm
                        title='Sure to delete?'
                        onConfirm={() =>
                            deleteStudent({variables: {studentID: record.studentID}, refetchQueries: ['ALL_STUDENTS']})
                        }>
                        <a>Delete</a>
                    </Popconfirm>
                </span>
            ),
        },
    ]

    return (
        <>
            <Table loading={loading} columns={columns} dataSource={students} />
            {!loading && students && (
                <StudentUpdate
                    data={students.find(student => student.studentID === currentStudent)}
                    visible={updateModalOpen}
                    setUpdateModalOpen={setUpdateModalOpen}
                />
            )}
        </>
    )
}

export default StudentTable
