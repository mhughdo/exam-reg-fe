import {useContext, createContext, useState} from 'react'

const LocalStateContext = createContext()

const LocalStateProvider = ({children}) => {
    const [globalLoading, setGlobalLoading] = useState(false)

    return <LocalStateContext.Provider value={{globalLoading, setGlobalLoading}}>{children}</LocalStateContext.Provider>
}

export const useLocalStateContext = () => useContext(LocalStateContext)

export {LocalStateProvider, LocalStateContext}
