import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { Header } from '../Header'

export const PageWrapper = ({children, title, addNew, addTeacher, account}) => {
    return (
        <div className={styles.pageWrapper}>
            <Header title={title} addNew={addNew} addTeacher={addTeacher} account={account} />
            <div className={styles.pageWrapperContent}>
                {children}
            </div>
        </div>
    )
}
