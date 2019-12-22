import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {createContext, useContext} from 'react'

const ME = gql`
    query getUser {
        me {
            studentID
            userInfo {
                name
                userType
            }
        }
    }
`
const UserContext = createContext()

export const useUser = () => {
    const {data} = useQuery(ME)

    return {data}
}

export const useUserContext = () => useContext(UserContext)

export {UserContext}
