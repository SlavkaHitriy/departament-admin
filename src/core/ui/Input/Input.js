import React from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

export const Input = ({placeholder, error, textarea, type, id, label, disabled, ...typeHandle}) => {
    return (
        <div className={cn({
            [styles.inputWrapper]: true,
            [styles.inputWrapperError]: error,
        })}>
            <label className={styles.inputLabel} htmlFor={id}>{label}</label>
            {
                textarea ? (
                    <textarea
                        className={styles.inputTextarea}
                        value={typeHandle.value}
                        onChange={typeHandle.onChange}
                        id={id}
                    />
                ) : (
                    <input
                        className={cn({
                            [styles.input]: true,
                            [styles.inputDisabled]: disabled,
                        })}
                        type={type}
                        placeholder={placeholder}
                        value={typeHandle.value}
                        onChange={typeHandle.onChange}
                        id={id}
                    />
                )
            }
            {error && <span className={styles.inputError}>{error}</span>}
        </div>
    )
}
