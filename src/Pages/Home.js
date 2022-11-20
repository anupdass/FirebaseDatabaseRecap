import React, { useContext, useEffect, useState } from 'react'
import CountValue from '../Components/CountValue'
import PostDataToFirebase from '../Components/PostDataFirebase/PostDataToFirebase'
import RestData from '../Components/RestData'
import { userContext } from '../Context/AuthContext'

const Home = () => {

    const [name, setName] = useState('anup')
    const [heRef, setHeRef] = useState()

    const { count, increment, deCrement } = useContext(userContext)


    useEffect(() => {

        document.querySelector('input').focus();
        document.querySelector('#anup').focus();

        return () => {
            console.log('That is React cleanup useEffect')
        }
    }, [name])

    return (
        <div>
            <PostDataToFirebase />
            <RestData />
            <h1>{count}</h1>
            <button onClick={() => increment()}>Increment</button>
            <button onClick={() => deCrement()}>Decrement</button>
            <input type="text" name="" onChange={text => setName(text.target.value)} />
            <input type="text" name="" id='anup' onChange={text => setName(text.target.value)} />
            <h1 ref={(heEl) => { setHeRef(heEl) }}>Hello I am Home Component</h1>
            <h2>{name}</h2>
            <CountValue />
        </div>
    )
}

export default React.memo(Home)