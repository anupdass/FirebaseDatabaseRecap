import React, { useEffect, useState } from 'react'
import axios from 'axios'

const RestData = () => {

    const [data, setData] = useState([])
    const [input, setInput] = useState()

    const getInput = (e) => {
        const nam = e.target.value;
        setInput(nam)
    }

    const fetchData = () => {
        axios.get('https://637355c8348e947299096e6c.mockapi.io/users')
            .then(res => setData(res.data))
            .then(err => console.log(err))
    }

    const handlePost = () => {

        axios.post('https://637355c8348e947299096e6c.mockapi.io/users', { name: input })
            .then(res => console.log(res))
            .then(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete(`https://637355c8348e947299096e6c.mockapi.io/users/${id}`)
            .then(res => console.log(res))
            .then(err => console.log(err))
    }

    const handleUpdate = (id) => {
        axios.put(`https://637355c8348e947299096e6c.mockapi.io/users/${id}`, { name: 'Rahim' })
            .then(res => console.log(res))
            .then(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <input placeholder='enter your name' onChange={getInput} />
            <button onClick={handlePost}>Handle To Fetch data</button>
            {
                data.map(user =>
                    <li>
                        {user.name}
                        <button onClick={() => handleUpdate(user.id)}>update</button>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                )
            }
        </div >
    )
}

export default RestData