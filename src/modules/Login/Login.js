import React, { useEffect, useState } from 'react'
import { checkErrors } from '../../core/functions/checkErrors'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Store
import { AuthStore, NotificationsStore } from '../../store'

// Utils
import { getCookie, setCookie } from '../../utils/cookie'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'
import { Form } from '../../core/ui/Form'
import { Input } from '../../core/ui/Input'
import { useInput } from '../../core/hooks/useInput'
import { Btn } from '../../core/ui/Btn'

export const Login = () => {
    const navigate = useNavigate()

    const inputEmail = useInput('')
    const inputPassword = useInput('')

    const [content, setContent] = useState(false)
    const [errors, setErrors] = useState({})

    const checkCredentials = async () => {
        const inputsInfo = [
            {el: inputEmail, errorName: 'email', errorText: 'Введіть email'},
            {el: inputPassword, errorName: 'password', errorText: 'Введіть пароль'},
        ]

        if (checkErrors(setErrors, inputsInfo)) return

        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                }),
            })

            if (response.status === 400) {
                const loginErrorID = uuidv4()

                NotificationsStore.addNotification(loginErrorID, 'error', 'Дані для входу введені невірно')
                NotificationsStore.removeNotification(5000, loginErrorID)

                return
            }

            setCookie('access_role', inputEmail.value)
            AuthStore.setIsAuth(true)
            navigate('/news/1')
        } catch {
            const loginErrorID = uuidv4()

            NotificationsStore.addNotification(loginErrorID, 'error', 'Дані для входу введені невірно')
            NotificationsStore.removeNotification(5000, loginErrorID)
        }
    }

    useEffect(() => {
        if (getCookie('access_role'))
            navigate('/news/1')
        else
            setContent(true)
    }, [])

    return content ? (
        <PageWrapper title={'Вхід'}>
            <div className={styles.login}>
                <Form className={styles.loginForm} onSubmit={checkCredentials}>
                    <Input type={'text'} label={'Email'} id={'email'} {...inputEmail} error={errors.email}/>
                    <Input type={'password'} label={'Пароль'} id={'password'} {...inputPassword} error={errors.password}/>
                    <Btn className={styles.loginBtn} type={'submit'}>
                        Увійти
                    </Btn>
                </Form>
            </div>
        </PageWrapper>
    ) : <div></div>
}
