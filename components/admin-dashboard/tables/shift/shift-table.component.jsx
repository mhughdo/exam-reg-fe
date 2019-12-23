import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table, Divider, Popconfirm} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'
import useDynamicMutation from '../../../../hooks/useDynamicMutation'
import ShiftUpdate from './shift-update.component'

const ALL_SHIFTS = gql`
    query ALL_SHIFTS {
        shifts {
            id
            shiftID
            date
            startTime
            endTime
        }
    }
`
const SHIFT_DELETE = gql`
    mutation SHIFT_DELETE($shiftID: String!) {
        deleteShift(shiftID: $shiftID) {
            id
        }
    }
`

const ShiftTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_SHIFTS})
    const [shifts, setShifts] = useState(null)
    const {fn: deleteShift} = useDynamicMutation({query: SHIFT_DELETE, successMsg: 'Deleted shift successfully'})
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [currentShift, setCurrentShift] = useState(null)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'shiftID',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'Start Time',
            dataIndex: 'startTime',
        },
        {
            title: 'End Time',
            dataIndex: 'endTime',
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
                            setCurrentShift(record.shiftID)
                        }}>
                        Edit
                    </a>
                    <Divider type='vertical' />
                    <Popconfirm
                        title='Sure to delete?'
                        onConfirm={() =>
                            deleteShift({variables: {shiftID: record.shiftID}, refetchQueries: ['ALL_SHIFTS']})
                        }>
                        <a>Delete</a>
                    </Popconfirm>
                </>
            ),
        },
    ]

    useEffect(() => {
        if (!data) return setShifts(null)

        if (data.shifts.length) {
            const transformedData = data.shifts.map(shift => {
                return {
                    key: shift.id,
                    shiftID: shift.shiftID,
                    date: shift.date,
                    startTime: shift.startTime,
                    endTime: shift.endTime,
                }
            })
            setShifts(transformedData)
        }
    }, [data])

    return (
        <>
            <Table loading={loading} columns={columns} dataSource={shifts} />
            {!loading && shifts && (
                <ShiftUpdate
                    data={shifts.find(shift => shift.shiftID === currentShift)}
                    visible={updateModalOpen}
                    setUpdateModalOpen={setUpdateModalOpen}
                />
            )}
        </>
    )
}

export default ShiftTable
