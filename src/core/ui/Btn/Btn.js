import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const Btn = ({children, type, onClick, className, red, disable}) => {
    return (
        <button
            className={cn({
                [styles.btn]: true,
                [className]: className,
                [styles.btnRed]: red,
                [styles.btnDisabled]: disable,
            })}
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
