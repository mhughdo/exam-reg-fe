import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'

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
            }
            nonEligibleCourses {
                id
            }
        }
    }
`

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
    },
]

const StudentTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_STUDENTS})
    const [students, setStudents] = useState(null)

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
                }
            })
            setStudents(transformedData)
        }
    }, [data])

    return <Table loading={loading} columns={columns} dataSource={students} />
}

export default StudentTable
