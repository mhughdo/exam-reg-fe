import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table} from 'antd'
import useDynamicQuery from '../../../hooks/useDynamicQuery'
import {useUserContext} from '../../User'

const COURSES = gql`
    query getCoursesByStudent($query: String!) {
        students(query: $query) {
            id
            courses {
                id
                name
                courseID
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
]

const CourseTable = () => {
    const me = useUserContext()
    const {data, loading} = useDynamicQuery({query: COURSES, variables: {query: me.studentID}})
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        if (!data) return setCourses(null)

        if (data.students.length) {
            const transformedCourses = data.students[0].courses.map(course => {
                return {
                    key: course.id,
                    courseName: course.name,
                    courseID: course.courseID,
                }
            })
            setCourses(transformedCourses)
        }
    }, [data])

    return <Table loading={loading} columns={columns} dataSource={courses} />
}

export default CourseTable
