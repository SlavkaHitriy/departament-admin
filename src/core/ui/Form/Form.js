import React from 'react'

export const Form = ({onSubmit, children, className}) => {
    const handleSubmit = e => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    )
}
