/* eslint react-hooks/exhaustive-deps: 0 */

import React, {useEffect} from 'react'
import {Modal, Form, Input} from 'antd'
import gql from 'graphql-tag'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'

const COURSE_UPDATE = gql`
    mutation COURSE_UPDATE($courseID: String!, $data: CourseUpdateInput!) {
        updateCourse(courseID: $courseID, data: $data) {
            id
        }
    }
`

const CourseUpdate = ({visible, setUpdateModalOpen, data, form}) => {
    const {fn: updateCourse, loading} = useDynamicMutation({
        query: COURSE_UPDATE,
        successMsg: 'Update course successfully',
    })
    const {getFieldDecorator} = form

    useEffect(() => {
        if (data && visible) {
            form.setFieldsValue({
                courseName: data.name,
                courseID: data.courseID,
                studentIDs: data.students.map(student => student.studentID).join(', '),
                nonEligibleStudentIDs: data.nonEligibleStudents.map(student => student.studentID).join(', '),
            })
        }
    }, [data, visible])

    const getArgs = (oldArr, newArr) => {
        const args = {}
        if (oldArr.length && !newArr.length) {
            args.disconnect = oldArr
        } else if (newArr.length) {
            const disconnectDiffs = oldArr.filter(course => !newArr.includes(course))
            args.disconnect = disconnectDiffs || null

            const connectDiffs = newArr.filter(course => !oldArr.includes(course))
            args.connect = connectDiffs || null
        }
        return args
    }

    const handleCreate = () => {
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            let {courseName, courseID, studentIDs, nonEligibleStudentIDs} = values
            studentIDs = studentIDs
                ? studentIDs
                      .split(', ')
                      .map(course => course.trim())
                      .filter(course => !!course)
                : []
            nonEligibleStudentIDs = nonEligibleStudentIDs
                ? nonEligibleStudentIDs
                      .split(', ')
                      .map(course => course.trim())
                      .filter(course => !!course)
                : []

            const oldStudents = data.students.map(student => student.studentID.trim())
            const studentIDsArgs = getArgs(oldStudents, studentIDs)

            const oldNonEligibleStudents = data.nonEligibleStudents.map(student => student.studentID.trim())
            const nonEligibleStudentIDsArgs = getArgs(oldNonEligibleStudents, nonEligibleStudentIDs)

            updateCourse({
                variables: {
                    courseID: data.courseID,
                    data: {
                        name: courseName,
                        courseID,
                        studentIDs: studentIDsArgs,
                        nonEligibleStudentIDs: nonEligibleStudentIDsArgs,
                    },
                },
                refetchQueries: ['ALL_COURSES'],
            })
        })
    }

    return (
        <Modal
            title='Update course'
            visible={visible}
            onOk={handleCreate}
            okText='Update'
            confirmLoading={loading}
            onCancel={() => setUpdateModalOpen(false)}>
            <Form layout='vertical'>
                <Form.Item label='Course Name'>
                    {getFieldDecorator('courseName', {
                        rules: [{required: true, message: 'Please input course name!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Course ID'>
                    {getFieldDecorator('courseID', {
                        rules: [{required: true, message: 'Please input course id!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Student IDs'>{getFieldDecorator('studentIDs')(<Input />)}</Form.Item>
                <Form.Item label='Non Eligible Student IDs'>
                    {getFieldDecorator('nonEligibleStudentIDs')(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const CourseUpdateForm = Form.create({name: 'form_in_modal'})(CourseUpdate)

export default CourseUpdateForm
