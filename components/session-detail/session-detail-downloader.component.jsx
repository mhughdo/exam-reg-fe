import {PDFDownloadLink} from '@react-pdf/renderer'
import {Icon, Button} from 'antd'
import SessionDetailPDF from './session-detail-pdf.component'

const SessionDetailDownloader = ({ssid, sessionInfo, students}) => {
    return (
        <>
            {students && (
                <div className='download-button'>
                    <Button>
                        <Icon type='export' style={{fontSize: '18px'}} />
                        <PDFDownloadLink
                            document={<SessionDetailPDF ssid={ssid} students={students} sessionInfo={sessionInfo} />}
                            fileName={`${ssid}.pdf`}>
                            {({blob, url, loading: l1, error}) => (l1 ? 'Loading document...' : 'Export')}
                        </PDFDownloadLink>
                    </Button>
                </div>
            )}
        </>
    )
}

export default SessionDetailDownloader
