import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'

export const Teachers = () => {
    return (
        <PageWrapper title={'Викладачі'}>
            <div className={styles.teachers}>
                Викладачі
            </div>
        </PageWrapper>
    )
}
