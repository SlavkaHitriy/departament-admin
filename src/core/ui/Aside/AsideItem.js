import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Utils
import { changeRoute } from '../../../utils/changeRoute'

export const AsideItem = ({data, active}) => {
    return (
        <li className={cn({
            [styles.asideItem]: true,
            [styles.asideItemActive]: (active === data.route) || (active.includes('new') && data.route.includes('new'))
        })}>
            <Link className={styles.asideLink} to={data.route} onClick={() => changeRoute(data.route, data.name)}>
                <img src={data.icon} alt='icon'/>
                {data.name}
            </Link>
        </li>
    )
}
