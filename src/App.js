import React from 'react'

// Components
import MainRoutes from './routes/MainRoutes'
import { Aside } from './core/ui/Aside'
import { Header } from './core/ui/Header'

const App = () => {
    return (
        <div className='app'>
            <Aside />
            <div className='app__content'>
                <Header />
                <div className='app__wrapper'>
                    <MainRoutes />
                </div>
            </div>
        </div>
    )
}

export default App
