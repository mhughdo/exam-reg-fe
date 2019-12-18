import gql from 'graphql-tag'

const ME = gql`
    query getUser {
        me {
            studentID
            userInfo {
                name
            }
        }
    }
`

export default apolloClient =>
    apolloClient
        .query({
            query: ME,
        })
        .then(({data}) => {
            return {data}
        })
        .catch(() => {
            // Fail gracefully
            return {data: {}}
        })
