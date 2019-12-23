import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import { Table, Divider} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'

const ALL_COURSES = gql`
    query ALL_COURSES {
        courses {
            id
            name
            courseID
            students {
                id
            }
        }
    }
`

const columns = [
    {
        title: 'Course Name',
        dataIndex: 'courseName',
    },
    {
        title: 'Course ID',
        dataIndex: 'courseID',
    },
    {
        title: 'Students',
        dataIndex: 'students',
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

const CourseTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_COURSES})
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        if (!data) return setCourses(null)

        if (data.courses.length) {
            const transformedCourses = data.courses.map(course => {
                return {
                    key: course.id,
                    courseName: course.name,
                    courseID: course.courseID,
                    students: course.students.length,
                }
            })
            setCourses(transformedCourses)
        }
    }, [data])

    return <Table loading={loading} columns={columns} dataSource={courses} />
}

export default CourseTable
