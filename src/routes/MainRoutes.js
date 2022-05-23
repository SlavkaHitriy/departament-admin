import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import News from '../pages/News/News'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/news' element={<News/>}/>
            <Route path='*' element={<Navigate to='/news' replace/>}/>
        </Routes>
    )
}

export default MainRoutes
