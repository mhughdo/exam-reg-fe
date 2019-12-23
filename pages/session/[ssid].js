import {useRouter} from 'next/router'
import SessionDetail from '../../components/session-detail/session-detail.component'

const Session = () => {
    const router = useRouter()
    const {ssid} = router.query

    return (
        <>
            <SessionDetail ssid={ssid} />
        </>
    )
}

export default Session
