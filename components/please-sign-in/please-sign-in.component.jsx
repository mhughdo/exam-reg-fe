import {ClipLoader} from 'react-spinners'
import {css} from '@emotion/core'
import useUser from '../User'
import Login from '../login-form/login-form.component'
import './please-sign-in.styles.scss'
import {withApollo} from '../../lib/apollo'

const override = css`
    display: block;
    margin: 0 auto;
`

const PleaseSignIn = ({children, ...rest}) => {
    const {data} = useUser()

    console.log(data)

    if (!data) {
        return (
            <div className='spinner-container'>
                <ClipLoader css={override} loading color='#1890ff' size={60} />
            </div>
        )
    }

    if (data && !data.me) {
        return <Login />
    }

    return <>{children}</>
}

export default PleaseSignIn
