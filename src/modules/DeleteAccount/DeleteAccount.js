import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { deleteCookie, getCookie } from '../../utils/cookie'

// Styles
import styles from './index.module.scss'

// Store
import { AuthStore, NotificationsStore } from '../../store'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'
import { useInput } from '../../core/hooks/useInput'
import { checkErrors } from '../../core/functions/checkErrors'
import { Form } from '../../core/ui/Form'
import { Input } from '../../core/ui/Input'
import { Btn } from '../../core/ui/Btn'
import { useNavigate } from 'react-router-dom'

export const DeleteAccount = () => {
    const navigate = useNavigate()

    const inputEmail = useInput('')

    const [errors, setErrors] = useState({})

    const logout = async () => {
        await fetch(`http://localhost:5000/logout`, {
            method: 'POST',
        })

        deleteCookie('access_role')
        AuthStore.setIsAuth(false)
        navigate('/login')
    }

    const deleteAcc = async () => {
        try {
            const response = await fetch(`http://localhost:5000/${inputEmail.value}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                }),
            })

            if (response.status !== 200) {
                const deleteAccErrorID = uuidv4()

                NotificationsStore.addNotification(deleteAccErrorID, 'error', `Пошта ${inputEmail.value} не зареєстрована`)
                NotificationsStore.removeNotification(5000, deleteAccErrorID)

                return
            }

            const deleteAccErrorID = uuidv4()

            NotificationsStore.addNotification(deleteAccErrorID, 'success', 'Успішно видалено обліковий запис')
            NotificationsStore.removeNotification(5000, deleteAccErrorID)

            if (inputEmail.value === getCookie('access_role')) logout()
        } catch {
            const deleteAccErrorID = uuidv4()

            NotificationsStore.addNotification(deleteAccErrorID, 'error', `Пошта ${inputEmail.value} не зареєстрована`)
            NotificationsStore.removeNotification(5000, deleteAccErrorID)
        }
    }

    const checkInputs = () => {
        const inputsInfo = [
            {el: inputEmail, errorName: 'email', errorText: 'Введіть email'},
        ]

        if (checkErrors(setErrors, inputsInfo)) return

        deleteAcc()
    }

    return (
        <PageWrapper title={'Видалити обліковий запис'}>
            <div className={styles.newAcc}>
                <Form className={styles.newAccForm} onSubmit={checkInputs}>
                    <Input type={'text'} label={'Email'} id={'email'} {...inputEmail} error={errors.email}/>
                    <Btn className={styles.newAccBtn} type={'submit'} red>
                        Видалити обліковий запис
                    </Btn>
                </Form>
            </div>
        </PageWrapper>
    )
}
