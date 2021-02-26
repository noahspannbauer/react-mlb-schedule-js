import { useEffect } from 'react'
import { useAppContext } from '../../hooks/appContext/UseAppContext'

const Menu = () => {
    const { appContext, setAppContext } = useAppContext()

    useEffect(() => {
        console.log(appContext.isMenuOpen)
    }, [])

    return (
        <div>
            Menu
        </div>
    )
}

export default Menu