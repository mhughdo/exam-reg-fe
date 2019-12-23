import {useMutation} from '@apollo/react-hooks'
import {message} from 'antd'
import displayMessage from '../shared/displayMessage'

const useDynamicMutation = ({query = '', successMsg = ''}) => {
    const [fn, {data, loading}] = useMutation(query, {
        ssr: false,
        onError: e => displayMessage(e),
        onCompleted: e => {
            if (successMsg) message.success(successMsg)
        },
    })

    return {fn, data, loading}
}

export default useDynamicMutation
