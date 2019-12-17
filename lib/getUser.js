import gql from 'graphql-tag'

const ME = gql`
    query getUser {
        me {
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
