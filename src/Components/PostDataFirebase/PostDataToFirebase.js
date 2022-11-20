import axios from 'axios';
import React, { useState } from 'react'

const PostDataToFirebase = () => {
    const [name, setName] = useState()
    const handleInput = (e) => {
        const input = e.target.value;
        setName(input)
    }

    const postData = () => {
        axios.post('https://expo-firebasestore-default-rtdb.firebaseio.com/user.json', { name })
            .then(res => console.log(res))
    }

    const getData = () => {
        axios.get('https://expo-firebasestore-default-rtdb.firebaseio.com/user.json')
            .then(res => console.log(res))
    }
    const handleFile = (e) => {
        setName(e.target[0].files[0])
    }
    return (
        <div style={{ marginBottom: '20px' }}>
            <input onChange={handleInput} placeholder='Enter Name' />
            <input type='file' onChange={handleFile} />
            <button onClick={postData}>Upload Data</button>
        </div>
    )
}

export default PostDataToFirebase