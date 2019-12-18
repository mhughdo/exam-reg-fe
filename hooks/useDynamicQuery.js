import {useQuery} from '@apollo/react-hooks'
import displayMessage from '../shared/displayMessage'

const useDynamicQuery = ({query = '', variables = {}}) => {
    const {data, loading} = useQuery(query, {ssr: false, onError: e => displayMessage(e), variables})

    return {data, loading}
}

export default useDynamicQuery
