import {useQuery} from '@apollo/react-hooks'
import displayMessage from '../shared/displayMessage'

const useDynamicQuery = ({query = '', variables = {}}) => {
    const {data, loading, refetch} = useQuery(query, {
        fetchPolicy: 'no-cache',
        ssr: false,
        onError: e => displayMessage(e),
        variables,
    })

    return {data, loading, refetch}
}

export default useDynamicQuery
