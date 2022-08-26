import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Styles
import styles from './index.module.scss'

// Store
import { NotificationsStore } from '../../store'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'
import { useInput } from '../../core/hooks/useInput'
import { checkErrors } from '../../core/functions/checkErrors'
import { Form } from '../../core/ui/Form'
import { Input } from '../../core/ui/Input'
import { Btn } from '../../core/ui/Btn'

export const NewAccount = () => {
    const inputName = useInput('')
    const inputEmail = useInput('')

    const [errors, setErrors] = useState({})
    const [password, setPassword] = useState('')

    const createAcc = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: inputName.value,
                    email: inputEmail.value,
                }),
            })
            const data = await response.json()

            if (data.isSuccess) {
                setPassword(data.password)
            } else {
                const newAccErrorID = uuidv4()

                NotificationsStore.addNotification(newAccErrorID, 'error', `Обліковий запис з поштою ${inputEmail.value} вже зареєстрований`)
                NotificationsStore.removeNotification(5000, newAccErrorID)
            }
        } catch {
            const newAccErrorID = uuidv4()

            NotificationsStore.addNotification(newAccErrorID, 'error', 'Виникла помилка при створенні облікового запису')
            NotificationsStore.removeNotification(5000, newAccErrorID)
        }
    }

    const checkInputs = () => {
        const inputsInfo = [
            {el: inputName, errorName: 'name', errorText: `Введіть ім'я`},
            {el: inputEmail, errorName: 'email', errorText: 'Введіть email'},
        ]

        if (checkErrors(setErrors, inputsInfo)) return

        createAcc()
    }

    return (
        <PageWrapper title={'Новий обліковий запис'}>
            <div className={styles.newAcc}>
                <Form className={styles.newAccForm} onSubmit={checkInputs}>
                    <Input type={'text'} label={`Ім'я`} id={'name'} {...inputName} error={errors.name}/>
                    <Input type={'text'} label={'Email'} id={'email'} {...inputEmail} error={errors.email}/>
                    <Btn className={styles.newAccBtn} type={'submit'}>
                        Створити обліковий запис
                    </Btn>
                    {
                        password && (
                            <div className={styles.newAccPass}>
                                Пароль для входу в обліковий запис: <span>{password}</span>
                            </div>
                        )
                    }
                </Form>
            </div>
        </PageWrapper>
    )
}
