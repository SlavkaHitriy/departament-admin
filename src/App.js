import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

// Utils
import { getCookie } from './utils/cookie'

// Store
import { AuthStore } from './store'

// Components
import MainRoutes from './routes/MainRoutes'
import { Aside } from './core/ui/Aside'
import { Notifications } from './core/ui/Notifications'

const App = observer(() => {
    const navigate = useNavigate()

    const [content, setContent] = useState('')

    useEffect(() => {
        if (getCookie('access_role')) {
            setContent('panel')
        } else {
            setContent('login')
            navigate('/login')
        }
    }, [AuthStore.isAuth])

    return (
        <div className='app'>
            <Aside login={content === 'login'} />
            <div className='app__content'>
                <MainRoutes />
            </div>
            <Notifications />
        </div>
    )
})

export default App
