/* eslint react-hooks/exhaustive-deps: 0 */

import React, {useEffect} from 'react'
import {Modal, Form, Input, message} from 'antd'
import gql from 'graphql-tag'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'

const ROOM_UPDATE = gql`
    mutation ROOM_UPDATE($roomID: String!, $data: RoomUpdateInput!) {
        updateRoom(roomID: $roomID, data: $data) {
            id
        }
    }
`

const RoomUpdate = ({visible, setUpdateModalOpen, data, form}) => {
    const {fn: updateRoom, loading} = useDynamicMutation({
        query: ROOM_UPDATE,
        successMsg: 'Update room successfully',
    })
    const {getFieldDecorator} = form

    useEffect(() => {
        if (data && visible) {
            form.setFieldsValue({
                roomID: data.roomID,
                totalPC: data.totalPC,
            })
        }
    }, [data, visible])

    const handleCreate = () => {
        form.validateFields((err, values) => {
            if (err) {
                return
            }

            let {roomID, totalPC} = values

            if (isNaN(totalPC)) {
                message.error('Please input valid totalPC value')
                return
            }

            updateRoom({
                variables: {
                    roomID: data.roomID,
                    data: {
                        roomID,
                        totalPC: Number(totalPC),
                    },
                },
                refetchQueries: ['ALL_ROOMS'],
            })
        })
    }

    return (
        <Modal
            title='Update room'
            visible={visible}
            onOk={handleCreate}
            okText='Update'
            confirmLoading={loading}
            onCancel={() => setUpdateModalOpen(false)}>
            <Form layout='vertical'>
                <Form.Item label='Room ID'>
                    {getFieldDecorator('roomID', {
                        rules: [{required: true, message: 'Please input room id!'}],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label='Total PC'>
                    {getFieldDecorator('totalPC', {
                        rules: [{required: true, message: 'Please input total PC!'}],
                    })(<Input />)}
                </Form.Item>
            </Form>
        </Modal>
    )
}

const RoomUpdateForm = Form.create({name: 'form_in_modal'})(RoomUpdate)

export default RoomUpdateForm
