/* eslint-disable react/display-name */
import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table, Divider, Popconfirm} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'
import RoomUpdate from './room-update.component'

const ALL_ROOMS = gql`
    query ALL_ROOMS {
        rooms {
            id
            roomID
            totalPC
        }
    }
`

const ROOM_DELETE = gql`
    mutation ROOM_DELETE($roomID: String!) {
        deleteRoom(roomID: $roomID) {
            id
        }
    }
`

const RoomTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_ROOMS})
    const [rooms, setRooms] = useState(null)
    const {fn: deleteRoom} = useDynamicMutation({query: ROOM_DELETE, successMsg: 'Deleted room successfully'})
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [currentRoom, setCurrentRoom] = useState(null)

    useEffect(() => {
        if (!data) return setRooms(null)

        if (data.rooms.length) {
            const transformedData = data.rooms.map(room => {
                return {
                    key: room.id,
                    roomID: room.roomID,
                    totalPC: room.totalPC,
                }
            })
            setRooms(transformedData)
        }
    }, [data])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'roomID',
        },
        {
            title: 'Total PC',
            dataIndex: 'totalPC',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => (
                <>
                    <a
                        onClick={() => {
                            setUpdateModalOpen(true)
                            setCurrentRoom(record.roomID)
                        }}>
                        Edit
                    </a>
                    <Divider type='vertical' />
                    <Popconfirm
                        title='Sure to delete?'
                        onConfirm={() =>
                            deleteRoom({variables: {roomID: record.roomID}, refetchQueries: ['ALL_ROOMS']})
                        }>
                        <a>Delete</a>
                    </Popconfirm>
                </>
            ),
        },
    ]

    return (
        <>
            <Table loading={loading} columns={columns} dataSource={rooms} />
            {!loading && rooms && (
                <RoomUpdate
                    data={rooms.find(room => room.roomID === currentRoom)}
                    visible={updateModalOpen}
                    setUpdateModalOpen={setUpdateModalOpen}
                />
            )}
        </>
    )
}

export default RoomTable
