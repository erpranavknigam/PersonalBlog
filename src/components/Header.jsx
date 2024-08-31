import { useEffect, useState } from 'react'
import './Header.css'
const Header = () => {
    const [isAdminPage, setIsAdminPage] = useState(false)
    useEffect(() => {
        const path = window.location.pathname
        setIsAdminPage(path.includes('/admin'))
    },[])

    const redirectToAdmin = () => {
        window.location.href = "http://localhost:3000/admin"
    }

    const logout = () => {
        window.location.href = "http://localhost:5173/"
    }
    return (
        <>
            <div className='blogTitle'>
                <div className='blogHeader'>Personal Blog</div>
                <div className='login'>
                {
                    isAdminPage ? (
                        <a onClick={logout}>Logout</a>
                    ) : (
                        <a onClick={redirectToAdmin}>Login</a>
                    )
                }
                </div>
            </div>
            <div className='underLines'></div>
        </>
    )
}

export default Header