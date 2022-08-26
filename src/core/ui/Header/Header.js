import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link, useNavigate } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Utils
import { deleteCookie } from '../../../utils/cookie'

// Store
import { AuthStore } from '../../../store'

// Components
import { Btn } from '../Btn'

export const Header = observer(({title, addNew, addTeacher, account}) => {
    const navigate = useNavigate()

    const logout = async () => {
        await fetch(`${process.env.REACT_APP_API_HOST}/logout`, {
            method: 'POST',
        })

        deleteCookie('access_role')
        AuthStore.setIsAuth(false)
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>
                {title}
            </h1>
            {
                addNew && (
                    <Link
                        className={styles.headerAddNew}
                        to={'/add-new'}
                    >
                        <div className={styles.headerAddNewPlus} />
                        Додати новину
                    </Link>
                )
            }
            {
                addTeacher && (
                    <Link
                        className={styles.headerAddNew}
                        to={'/add-teacher'}
                    >
                        <div className={styles.headerAddNewPlus} />
                        Додати викладача
                    </Link>
                )
            }
            {
                account && (
                    <Btn className={styles.headerLogout} onClick={logout} red>
                        Вийти з облікового запису
                    </Btn>
                )
            }
        </header>
    )
})
