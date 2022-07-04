import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import { News } from '../modules/News'
import { AddNew } from '../modules/AddNew'
import { Teachers } from '../modules/Teachers'
import { EditNew } from '../modules/EditNew'
import { Account } from '../modules/Account'
import { NewAccount } from '../modules/NewAccount'
import { Login } from '../modules/Login'
import { DeleteAccount } from '../modules/DeleteAccount'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/news/:page' element={<News/>}/>
            <Route path='/add-new' element={<AddNew/>}/>
            <Route path='/edit-new/:id' element={<EditNew/>}/>
            <Route path='/teachers' element={<Teachers/>}/>
            <Route path='/account' element={<Account/>}/>
            <Route path='/new-account' element={<NewAccount/>}/>
            <Route path='/delete-account' element={<DeleteAccount/>}/>
            <Route path='*' element={<Navigate to='/news/1' replace/>}/>
        </Routes>
    )
}

export default MainRoutes
