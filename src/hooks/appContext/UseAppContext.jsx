import { useContext } from 'react'
import AppContext from '../../context/AppContext'

export const useAppContext = () => {
    const { appContext, setAppContext } = useContext(AppContext)

    return {
        appContext,
        setAppContext
    }
}