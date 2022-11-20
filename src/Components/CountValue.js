import React, { useContext, useState } from 'react'
import { userContext } from '../Context/AuthContext'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import QRCode from 'react-qr-code'

const CountValue = () => {
    const { count } = useContext(userContext)
    const [inputValue, setinputValue] = useState({ name: '', pass: '' })
    const [value, setValue] = useState('');


    const getInput = (event) => {
        const value = { [event.target.name]: event.target.value }
        const newValue = { ...inputValue, ...value }
        setinputValue(newValue)
    }

    const submit = (e) => {
        console.log(inputValue)
        setinputValue({ name: '', pass: '' })
    }
    console.log(value)

    return (
        <>
            New Count Value: {count}
            <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={'https://www.google.com'}
                    viewBox={`0 0 256 256`}
                />
            </div>

            < >
                <input onChange={getInput} name='name' value={inputValue.name} />
                <input onChange={getInput} name='pass' type='text' value={inputValue.pass} />
                <button onClick={submit}>onClick</button>
            </>

            <div dangerouslySetInnerHTML={{ __html: value }}></div>

            <ReactQuill theme="snow" onChange={setValue} />
        </>
    )
}

export default CountValue