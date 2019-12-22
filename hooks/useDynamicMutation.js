import {useMutation} from '@apollo/react-hooks'
import displayMessage from '../shared/displayMessage'

const useDynamicMutation = ({query = ''}) => {
    const [fn, {data, loading}] = useMutation(query, {ssr: false, onError: e => displayMessage(e)})

    return {fn, data, loading}
}

export default useDynamicMutation
