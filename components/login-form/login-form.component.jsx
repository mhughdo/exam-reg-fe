import React from 'react'
import {Form, Icon, Input, Button, message} from 'antd'
import './login-form.styles.scss'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Logo from '../../assets/shark.svg'

const SIGN_IN = gql`
    mutation signIn($data: UserSignInInput!) {
        signIn(data: $data) {
            user {
                name
                email
                userType
            }
            token
        }
    }
`

const loginForm = ({form}) => {
    const [signIn, {data, loading, error}] = useMutation(SIGN_IN)

    if (error) return message.error(error)

    const handleSubmit = e => {
        e.preventDefault()
        // form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values)
        //     }
        // })
        const formValues = form.getFieldsValue()

        signIn({variables: {data: formValues}, refetchQueries: ['fetchUser']})
    }

    const {getFieldDecorator} = form

    return (
        <div className='login-component'>
            <img src={Logo} alt='img' />
            <h1 className='form-header'>Sign in to ExamReg</h1>
            <Form onSubmit={handleSubmit} className='login-form'>
                <Form.Item label='Email'>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: 'Please input your Email!'}],
                    })(<Input prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}} />} placeholder='Email' />)}
                </Form.Item>
                <Form.Item label='Password'>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />}
                            type='password'
                            placeholder='Password'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const WrappedLoginForm = Form.create({name: 'form-login'})(loginForm)

export default WrappedLoginForm
