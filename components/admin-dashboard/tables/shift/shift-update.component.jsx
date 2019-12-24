/* eslint react-hooks/exhaustive-deps: 0 */

import React, {useEffect} from 'react'
import {Modal, Form, Input} from 'antd'
import gql from 'graphql-tag'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'

const SHIFT_UPDATE = gql`
    mutation SHIFT_UPDATE($shiftID: String!, $data: ShiftUpdateInput!) {
        updateShift(shiftID: $shiftID, data: $data) {
            id
        }
    }
`

const ShiftUpdate = ({visible, setUpdateModalOpen, data, form}) => {
    const {fn: updateShift, loading} = useDynamicMutation({
        query: SHIFT_UPDATE,
        successMsg: 'Update shift successfully',
    })
    const {getFieldDecorator} = form

    useEffect(() => {
        if (data && visible) {
            form.setFieldsValue({
                shiftID: data.shiftID,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
            })
        }
    }, [data, visible])

    const handleCreate = () => {
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            let {shiftID, date, startTime, endTime} = values

            const variables = {
                shiftID: data.shiftID,
                data: {
                    shiftID,
                    startTime,
                    endTime,
                },
            }

            if (date !== data.date) {
                variables.data.date = date
            }

            updateShift({
                variables,
                refetchQueries: ['ALL_SHIFTS'],
            })
        })
    }

    return (
        <Modal
            title='Update shift'
            visible={visible}
            onOk={handleCreate}
            okText='Update'
            confirmLoading={loading}
            onCancel={() => setUpdateModalOpen(false)}>
            <Form layout='vertical'>
                <Form.Item label='Shift ID'>
                    {getFieldDecorator('shiftID', {
                        rules: [{required: true, message: 'Please input shift id!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Date'>
                    {getFieldDecorator('date', {
                        rules: [{required: true, message: 'Please input date!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Start Time'>
                    {getFieldDecorator('startTime', {
                        rules: [{required: true, message: 'Please input start time!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='End Time'>
                    {getFieldDecorator('endTime', {
                        rules: [{required: true, message: 'Please input end time!'}],
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const ShiftUpdateForm = Form.create({name: 'form_in_modal'})(ShiftUpdate)

export default ShiftUpdateForm
