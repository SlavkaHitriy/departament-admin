import React from 'react'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'

// Store
import routingStore from '../../../store/routing'

// Styles
import styles from './index.module.scss'

// Utils
import { changeRoute } from '../../../utils/changeRoute'

export const Header = observer(() => {
    return (
        <header className={styles.header}>
            <h1 className={styles.headerTitle}>
                {routingStore.activeName}
            </h1>
            {
                routingStore.activePage === '/news' && (
                    <Link
                        className={styles.headerAddNew}
                        to={'/add-new'}
                        onClick={() => changeRoute('/add-new', 'Додати новину')}
                    >
                        <div className={styles.headerAddNewPlus} />
                        Додати новину
                    </Link>
                )
            }
        </header>
    )
})
