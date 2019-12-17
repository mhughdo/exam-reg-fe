import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'

const ME = gql`
    query getUser {
        me {
            userInfo {
                name
            }
        }
    }
`

const useUser = () => {
    const {data} = useQuery(ME)

    return {data}
}

export default useUser
