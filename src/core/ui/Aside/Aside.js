import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'

// Styles
import styles from './index.module.scss'

// Images
import news from '../../../assets/images/news.svg'
import teachers from '../../../assets/images/teachers.svg'

// Store
import routingStore from '../../../store/routing'

// Components
import { AsideItem } from './AsideItem'

export const Aside = observer(() => {
    const menuData = useMemo(() => [
        {name: 'Новини', route: '/news', icon: news},
        {name: 'Викладачі', route: '/teachers', icon: teachers},
    ], [])

    return (
        <aside className={styles.aside}>
            <nav className={styles.asideNav}>
                <ul className={styles.asideList}>
                    {
                        menuData.map(menuItem => (
                            <AsideItem
                                active={routingStore.activePage}
                                key={menuItem.name}
                                data={menuItem}
                            />
                        ))
                    }
                </ul>
            </nav>
        </aside>
    )
})
