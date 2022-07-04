import React from 'react'
import { observer } from 'mobx-react-lite'

// Styles
import styles from './index.module.scss'

// Images
import news from '../../../assets/images/news.svg'
import teachers from '../../../assets/images/teachers.svg'
import account from '../../../assets/images/account.svg'

// Components
import { AsideItem } from './AsideItem'

export const Aside = observer(({login}) => {
    const menuData = [
        {name: 'Новини', route: '/news', icon: news,
            nesting: [
                {name: 'Додати новину', route: '/add-new'},
            ]
        },
        {name: 'Викладачі', route: '/teachers', icon: teachers},
        {name: 'Обліковий запис', route: '/account', icon: account,
            nesting: [
                {name: 'Додати обліковий запис', route: '/new-account'},
                {name: 'Видалити обліковий запис', route: '/delete-account'},
            ]
        },
    ]

    return (
        <aside className={styles.aside}>
            {
                !login && (
                    <nav className={styles.asideNav}>
                        <ul className={styles.asideList}>
                            {
                                menuData.map(menuItem => (
                                    <AsideItem
                                        key={menuItem.name}
                                        data={menuItem}
                                    />
                                ))
                            }
                        </ul>
                    </nav>
                )
            }
        </aside>
    )
})
