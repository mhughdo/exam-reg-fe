import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table, Divider, Popconfirm} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'
import CourseUpdate from './course-update.component'

const ALL_COURSES = gql`
    query ALL_COURSES {
        courses {
            id
            name
            courseID
            students {
                id
                studentID
            }
            nonEligibleStudents {
                id
                studentID
            }
        }
    }
`
const COURSE_DELETE = gql`
    mutation COURSE_DELETE($courseID: String!) {
        deleteCourse(courseID: $courseID) {
            id
        }
    }
`

const CourseTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_COURSES})
    const [courses, setCourses] = useState(null)
    const {fn: deleteCourse} = useDynamicMutation({
        query: COURSE_DELETE,
        successMsg: 'Deleted course successfully',
    })
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [currentCourse, setCurrentCourse] = useState(null)

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
            // eslint-disable-next-line react/display-name
            render: (text, record) => (
                <>
                    <a
                        onClick={() => {
                            setUpdateModalOpen(true)
                            setCurrentCourse(record.courseID)
                        }}>
                        Edit
                    </a>
                    <Divider type='vertical' />
                    <Popconfirm
                        title='Sure to delete?'
                        onConfirm={() =>
                            deleteCourse({variables: {courseID: record.courseID}, refetchQueries: ['ALL_COURSES']})
                        }>
                        <a>Delete</a>
                    </Popconfirm>
                </>
            ),
        },
    ]

    return (
        <>
            <Table loading={loading} columns={columns} dataSource={courses} />
            {!loading && data?.courses && (
                <CourseUpdate
                    data={data?.courses.find(course => course.courseID === currentCourse)}
                    visible={updateModalOpen}
                    setUpdateModalOpen={setUpdateModalOpen}
                />
            )}
        </>
    )
}

export default CourseTable
