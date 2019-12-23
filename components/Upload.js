import React, {useState} from 'react'
import {Upload, Button, Icon, message} from 'antd'
import axios from 'axios'

const uploadURL =
    process.env.NODE_ENV === 'production' ? 'https://examreg.hughdo.dev/api/upload' : 'http://localhost:4000/upload'

const UploadFile = ({fileName}) => {
    const customRequest = args => {
        const {onSuccess, file, onError} = args
        const data = new FormData()
        data.append(`${fileName}`, file)
        axios
            .post(`${uploadURL}/${fileName}`, data, {
                // receive two parameter endpoint url ,form data
                headers: {'Access-Control-Allow-Credentials': 'true'},
                withCredentials: true,
                credentials: 'include',
            })
            .then(res => {
                if (res.data.success) {
                    message.success(res.data.message)
                } else if (!res.data.success) {
                    message.error(res.data.message)
                }

                return onSuccess(res, file)
            })
            .catch(error => {
                console.log(error)
                return onError()
            })
    }

    return (
        <Upload
            accept='text/csv'
            action={`${uploadURL}/${fileName}`}
            name={fileName}
            multiple={false}
            withCredentials
            customRequest={customRequest}
            // onChange={handleFileChange}
        >
            <Button>
                <Icon type='upload' />
                {fileName || ''}
            </Button>
        </Upload>
    )
}

export default UploadFile
