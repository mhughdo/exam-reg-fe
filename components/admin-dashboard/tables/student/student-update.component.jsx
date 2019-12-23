/* eslint react-hooks/exhaustive-deps: 0 */

import React, {useEffect} from 'react'
import {Modal, Form, Input} from 'antd'
import gql from 'graphql-tag'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'

const STUDENT_UPDATE = gql`
    mutation STUDENT_UPDATE($studentID: String!, $data: StudentUpdateInput!) {
        updateStudent(studentID: $studentID, data: $data) {
            id
        }
    }
`

const StudentUpdate = ({visible, setUpdateModalOpen, data, form}) => {
    const {fn: updateStudent, loading} = useDynamicMutation({
        query: STUDENT_UPDATE,
        successMsg: 'Update student successfully',
    })
    const {getFieldDecorator} = form

    useEffect(() => {
        if (data && visible) {
            form.setFieldsValue({
                studentName: data.studentName,
                studentID: data.studentID,
                studentEmail: data.studentEmail,
                coursesID: data.rawCourses.map(course => course.courseID).join(', '),
                nonEligibleCoursesID: data.rawNonEligibleCourses.map(course => course.courseID).join(', '),
            })
        }
    }, [data, visible])

    const getArgs = (oldCourse, newCourse) => {
        const args = {}
        if (oldCourse.length && !newCourse) {
            args.disconnect = oldCourse
        } else if (newCourse.length) {
            const disconnectDiffs = oldCourse.filter(course => !newCourse.includes(course))
            args.disconnect = disconnectDiffs || null

            const connectDiffs = newCourse.filter(course => !oldCourse.includes(course))
            args.connect = connectDiffs || null
        }
        return args
    }

    const handleCreate = () => {
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            let {studentName, studentID, studentEmail, coursesID, nonEligibleCoursesID} = values
            coursesID = coursesID
                ? coursesID
                      .split(', ')
                      .map(course => course.trim())
                      .filter(course => !!course)
                : null
            nonEligibleCoursesID = nonEligibleCoursesID
                ? nonEligibleCoursesID
                      .split(', ')
                      .map(course => course.trim())
                      .filter(course => !!course)
                : null

            const oldCourse = data.rawCourses.map(course => course.courseID.trim())
            const coursesIDArgs = getArgs(oldCourse, coursesID)

            const oldNonEligibleCourses = data.rawNonEligibleCourses.map(course => course.courseID.trim())
            const nonEligibleCoursesIDArgs = getArgs(oldNonEligibleCourses, nonEligibleCoursesID)

            updateStudent({
                variables: {
                    studentID: data.studentID,
                    data: {
                        studentID,
                        userInfo: {name: studentName, email: studentEmail},
                        courseIDs: coursesIDArgs,
                        nonEligibleCourseIDs: nonEligibleCoursesIDArgs,
                    },
                },
                refetchQueries: ['ALL_STUDENTS'],
            })
        })
    }

    return (
        <Modal
            title='Update student'
            visible={visible}
            onOk={handleCreate}
            okText='Update'
            confirmLoading={loading}
            onCancel={() => setUpdateModalOpen(false)}>
            <Form layout='vertical'>
                <Form.Item label='Student Name'>
                    {getFieldDecorator('studentName', {
                        rules: [{required: true, message: 'Please input student name!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Student ID'>
                    {getFieldDecorator('studentID', {
                        rules: [{required: true, message: 'Please input student id!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Student Email'>
                    {getFieldDecorator('studentEmail', {
                        rules: [{required: true, message: 'Please input student email!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Courses ID'>{getFieldDecorator('coursesID')(<Input />)}</Form.Item>
                <Form.Item label='Non Eligible Courses'>
                    {getFieldDecorator('nonEligibleCoursesID')(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const StudentUpdateForm = Form.create({name: 'form_in_modal'})(StudentUpdate)

export default StudentUpdateForm
