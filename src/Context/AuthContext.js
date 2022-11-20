import React, { createContext, useState } from 'react'

export const userContext = createContext();

const AuthContext = ({ children }) => {

    const [count, setCount] = useState(1)

    const increment = (text) => {
        setCount(pre => pre + 1)
    }
    const deCrement = (text) => {
        setCount(pre => pre - 1)
    }

    return (
        <userContext.Provider value={{ count, increment, deCrement }}>
            {children}
        </userContext.Provider>
    )
}

export default AuthContext