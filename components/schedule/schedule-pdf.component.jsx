import {Document, Page, View, StyleSheet, Font, Text} from '@react-pdf/renderer'
import Roboto from '../../assets/Roboto-Light.ttf'
import {useUserContext} from '../User'

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
        width: '16%',
        borderStyle: 'solid',
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
    },
    tableCol: {
        width: '16%',
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
        marginLeft: 10,
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

const SchedulePDF = ({schedule, me}) => {
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.title}>PHIẾU BÁO DỰ THI</Text>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.text}>Name: {me?.userInfo.name}</Text>
                        <Text style={styles.text}>Student ID: {me?.studentID}</Text>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>#</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Course Name</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Course ID</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Date</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Start Time</Text>
                            </View>
                            <View style={styles.tableColHeader}>
                                <Text style={styles.tableCellHeader}>Room ID</Text>
                            </View>
                        </View>
                        {schedule &&
                            schedule.map(s => {
                                return (
                                    <View style={styles.tableRow}>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{s.index}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{s.courseName}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{s.courseID}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{s.date}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{s.startTime}</Text>
                                        </View>
                                        <View style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{s.roomID}</Text>
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

export default SchedulePDF
