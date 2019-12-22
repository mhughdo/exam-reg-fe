import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'

const ALL_ROOMS = gql`
    query ALL_ROOMS {
        rooms {
            id
            roomID
            totalPC
        }
    }
`

const columns = [
    {
        title: '#',
        dataIndex: 'roomID',
    },
    {
        title: 'Total PC',
        dataIndex: 'totalPC',
    },
]

const RoomTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_ROOMS})
    const [rooms, setRooms] = useState(null)

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

    return <Table loading={loading} columns={columns} dataSource={rooms} />
}

export default RoomTable
