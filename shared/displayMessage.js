import {message} from 'antd'

const displayMessage = error => {
    if (!error || !error.message) return null
    if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
        return error.networkError.result.errors.map((error, i) =>
            message.error(error.message.replace('GraphQL error: ', ''))
        )
    }

    return message.error(error.message.replace('GraphQL error: ', ''))
}

export default displayMessage
