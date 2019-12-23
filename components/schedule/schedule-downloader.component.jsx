import {PDFDownloadLink} from '@react-pdf/renderer'
import {Icon, Button} from 'antd'
import SchedulePDF from './schedule-pdf.component'

const ScheduleDownloader = ({schedule, me}) => {
    console.log(schedule)

    return (
        <div className='download-button'>
            <Button>
                <Icon type='export' style={{fontSize: '18px'}} />
                <PDFDownloadLink document={<SchedulePDF me={me} schedule={schedule} />} fileName='PHIEU_BAO_DU_THI.pdf'>
                    {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Export')}
                </PDFDownloadLink>
            </Button>
        </div>
    )
}

export default ScheduleDownloader
