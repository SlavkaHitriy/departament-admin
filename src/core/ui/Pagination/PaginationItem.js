import React from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const PaginationItem = ({prevArrow, nextArrow, disabled, link, children, active, separator}) => {
    return (
        <li className={styles.paginationItem}>
            {
                separator ? (
                    <div className={styles.paginationItemSeparator}>
                        <span />
                        <span />
                        <span />
                    </div>
                ) : (
                    <Link className={cn({
                        [styles.paginationLink]: true,
                        [styles.paginationLinkDisabled]: disabled,
                        [styles.paginationLinkActive]: active,
                    })} to={link}>
                        {prevArrow && <SvgSprite spriteID={'prevArrow'}/>}
                        {nextArrow && <SvgSprite spriteID={'nextArrow'}/>}
                        {children}
                    </Link>
                )
            }
        </li>
    )
}
