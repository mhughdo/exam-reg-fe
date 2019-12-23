/* eslint react-hooks/exhaustive-deps: 0 */

import React, {useEffect} from 'react'
import {Modal, Form, Input, message} from 'antd'
import gql from 'graphql-tag'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'

const SESSION_UPDATE = gql`
    mutation SESSION_UPDATE($id: ID!, $data: SessionUpdateInput!) {
        updateSession(id: $id, data: $data) {
            id
        }
    }
`

const SessionUpdate = ({visible, setUpdateModalOpen, data, form}) => {
    const {fn: updateSession, loading} = useDynamicMutation({
        query: SESSION_UPDATE,
        successMsg: 'Update session successfully',
    })
    const {getFieldDecorator} = form

    useEffect(() => {
        if (data && visible) {
            form.setFieldsValue({
                courseID: data.course.courseID,
                studentIDs: data.students.map(student => student.studentID).join(', '),
                shiftID: data.shift.shiftID,
                roomID: data.room.roomID,
            })
        }
    }, [data, visible])

    const getArgs = (oldArr, newArr) => {
        const args = {}
        if (oldArr.length && !newArr) {
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

            const emptyItem = Object.keys(values).some(item => {
                if (!item) return true
                return false
            })

            if (emptyItem) {
                message.error('Please input all the fields')
                return
            }

            let {studentIDs, courseID, shiftID, roomID} = values
            studentIDs = studentIDs
                ? studentIDs
                      .split(', ')
                      .map(course => course.trim())
                      .filter(course => !!course)
                : null

            const oldStudentIDs = data.students.map(student => student.studentID.trim())
            const sessionArgs = getArgs(oldStudentIDs, studentIDs)

            updateSession({
                variables: {id: data.id, data: {courseID, shiftID, roomID, studentIDs: sessionArgs}},
                refetchQueries: ['ALL_SESSIONS_ADMIN'],
            })
        })
    }

    return (
        <Modal
            title='Update session'
            visible={visible}
            onOk={handleCreate}
            okText='Update'
            confirmLoading={loading}
            onCancel={() => setUpdateModalOpen(false)}>
            <Form layout='vertical'>
                <Form.Item label='Course ID'>
                    {getFieldDecorator('courseID', {
                        rules: [{required: true, message: 'Please input course ID!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Student IDs'>
                    {getFieldDecorator('studentIDs', {
                        rules: [{required: true, message: 'Please input student IDs!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Shift ID'>
                    {getFieldDecorator('shiftID', {
                        rules: [{required: true, message: 'Please input shift ID!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Room ID'>
                    {getFieldDecorator('roomID', {
                        rules: [{required: true, message: 'Please input room ID!'}],
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const SessionUpdateForm = Form.create({name: 'form_in_modal'})(SessionUpdate)

export default SessionUpdateForm
