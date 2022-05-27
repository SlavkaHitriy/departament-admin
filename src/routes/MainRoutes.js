import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { News } from '../modules/News'
import { AddNew } from '../modules/AddNew'
import { Teachers } from '../modules/Teachers'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/news' element={<News/>}/>
            <Route path='/add-new' element={<AddNew/>}/>
            <Route path='/teachers' element={<Teachers/>}/>
            <Route path='*' element={<Navigate to='/news' replace/>}/>
        </Routes>
    )
}

export default MainRoutes
