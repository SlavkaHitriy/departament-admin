import React from 'react'
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const AsideItem = ({data}) => {
    return (
        <li className={cn({
            [styles.asideItem]: true,
        })}>
            <NavLink
                className={({isActive}) => isActive ? cn(styles.asideLink, styles.asideLinkActive) : styles.asideLink}
                to={data.route}
            >
                <img src={data.icon} alt='icon'/>
                {data.name}
            </NavLink>
            {
                data.nesting && data.nesting.map(link => (
                    <NavLink
                        className={({isActive}) => isActive ?
                            cn(styles.asideNestingLink, styles.asideNestingLinkActive) :
                            styles.asideNestingLink}
                        to={link.route}
                        key={link.name}
                    >
                        {link.name}
                    </NavLink>
                ))
            }
        </li>
    )
}
