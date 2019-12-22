import React, {useState, useEffect} from 'react'
import gql from 'graphql-tag'
import {Table} from 'antd'
import useDynamicQuery from '../../../../hooks/useDynamicQuery'

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

const columns = [
    {
        title: '#',
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
]

const ShiftTable = () => {
    const {data, loading} = useDynamicQuery({query: ALL_SHIFTS})
    const [shifts, setShifts] = useState(null)

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

    return <Table loading={loading} columns={columns} dataSource={shifts} />
}

export default ShiftTable
