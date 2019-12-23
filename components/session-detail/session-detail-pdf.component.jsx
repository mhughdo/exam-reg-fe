import React from 'react'
import {Document, Page, View, StyleSheet, Font, Text} from '@react-pdf/renderer'
import Roboto from '../../assets/Roboto-Light.ttf'

Font.register({
    family: 'Roboto',
    src: Roboto,
    fontWeight: 'normal',
    fontStyle: 'normal',
})

const styles = StyleSheet.create({
    body: {
        fontFamily: 'Roboto',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '25%',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
    },
    tableCol: {
        width: '25%',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderWidth: 1,
    },
    tableCellHeader: {
        margin: 'auto',
        margin: 5,
        fontSize: 12,
        fontWeight: 500,
    },
    tableCell: {
        margin: 'auto',
        margin: 5,
        fontSize: 10,
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
    },

    subSection: {},
    text: {
        fontSize: 12,
        fontWeight: 400,
    },
    container: {
        maxWidth: 1200,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
})

const SessionDetailPDF = ({students, sessionInfo}) => {
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}>Session Detail</Text>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <View style={styles.subSection}>
                            <Text style={styles.text}>Course Name: {sessionInfo.courseName}</Text>
                            <Text style={styles.text}>Course ID: {sessionInfo.courseID}</Text>
                            <Text style={styles.text}>Room ID: {sessionInfo.roomID}</Text>
                        </View>
                        <View style={styles.subSection}>
                            <Text style={styles.text}>Date: {sessionInfo.date}</Text>
                            <Text style={styles.text}>Start Time: {sessionInfo.startTime}</Text>
                            <Text style={styles.text}>End Time: {sessionInfo.endTime}</Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>#</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Student Name</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Student ID</Text>
                            </View>
                        </View>
                        {students &&
                            students.map(student => {
                                return (
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{student.index}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{student.studentName}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{student.studentID}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default SessionDetailPDF
