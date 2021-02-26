import { useState, useMemo } from 'react';
import AppContext from './AppContext'

const initialState = {
    isMenuOpen: false,
    isModalOpen: false
}

const AppContextProvider = (props) => {
    const [appContext, setAppContext] = useState(initialState)

    const contextValue = useMemo(() => {
        return {
            appContext,
            setAppContext
        }
    }, [appContext, setAppContext])

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider