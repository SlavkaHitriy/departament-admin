import React, { useState } from 'react'
import { checkErrors } from '../../core/functions/checkErrors'
import { useInput } from '../../core/hooks/useInput'
import { v4 as uuidv4 } from 'uuid'

// Styles
import styles from './index.module.scss'

// Utils
import { getCookie } from '../../utils/cookie'

// Store
import { NotificationsStore } from '../../store'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'
import { Input } from '../../core/ui/Input'
import { Btn } from '../../core/ui/Btn'
import { Form } from '../../core/ui/Form'

export const Account = () => {
    const inputEmail = useInput(getCookie('access_role'))
    const inputPassOld = useInput('')
    const inputPassNew = useInput('')

    const [errors, setErrors] = useState({})

    const createAcc = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/${inputEmail.value}/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: inputPassOld.value,
                    newPassword: inputPassNew.value,
                }),
            })

            console.log(response)

            if (response.status === 400) {
                const newAccErrorID = uuidv4()

                NotificationsStore.addNotification(newAccErrorID, 'error', 'Попередній пароль введено невірно або новий пароль не відповідає вимогам')
                NotificationsStore.removeNotification(5000, newAccErrorID)

                return
            }

            const newAccSuccessID = uuidv4()

            NotificationsStore.addNotification(newAccSuccessID, 'success', 'Пароль успішно змінено')
            NotificationsStore.removeNotification(3000, newAccSuccessID)

            inputPassOld.setNewValue('')
            inputPassNew.setNewValue('')
        } catch {
            const newAccErrorID = uuidv4()

            NotificationsStore.addNotification(newAccErrorID, 'error', 'Попередній пароль введено невірно або новий пароль не відповідає вимогам')
            NotificationsStore.removeNotification(5000, newAccErrorID)
        }
    }

    const checkInputs = () => {
        const inputsInfo = [
            {el: inputEmail, errorName: 'email', errorText: 'Введіть email'},
            {el: inputPassOld, errorName: 'passwordOld', errorText: `Введіть попередній пароль`},
            {el: inputPassNew, errorName: 'passwordNew', errorText: `Введіть новий пароль`},
        ]

        if (checkErrors(setErrors, inputsInfo)) return

        createAcc()
    }

    return (
        <PageWrapper title={'Обліковий запис'} account>
            <div className={styles.acc}>
                <Form className={styles.accForm} onSubmit={checkInputs}>
                    <Input
                        type={'text'}
                        label={'Email'}
                        id={'email'}
                        {...inputEmail}
                        error={errors.email}
                        disabled
                    />
                    <Input
                        type={'password'}
                        label={`Попередній пароль`}
                        id={'newPass'}
                        {...inputPassOld}
                        error={errors.passwordOld}
                    />
                    <Input
                        type={'password'}
                        label={`Новий пароль`}
                        id={'newPassNew'}
                        {...inputPassNew}
                        error={errors.passwordNew}
                    />
                    <Btn className={styles.accBtn} type={'submit'}>
                        Змінити пароль
                    </Btn>
                </Form>
            </div>
        </PageWrapper>
    )
}
