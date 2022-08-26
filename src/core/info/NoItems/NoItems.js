import React from 'react'

import styles from './index.module.scss'

export const NoItems = ({text}) => {
    return (
        <div className={styles.noItems}>
            {text}
        </div>
    )
}
