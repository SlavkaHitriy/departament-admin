import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { checkErrors } from '../../core/functions/checkErrors'

// Styles
import styles from './index.module.scss'

// Hooks
import { useInput } from '../../core/hooks/useInput'

// Store
import { NotificationsStore } from '../../store'

// Components
import { Form } from '../../core/ui/Form'
import { Input } from '../../core/ui/Input'
import { Btn } from '../../core/ui/Btn'
import { UploadFile } from '../../core/ui/UploadFile'
import { PageWrapper } from '../../core/ui/PageWrapper'
import { RichTextEditor } from '../../core/ui/RichTextEditor'

export const AddNew = () => {
    const navigate = useNavigate()

    const inputName = useInput('')
    const inputDesc = useInput('')
    const textareaDesc = useInput('')
    const [file, setFile] = useState()

    const [errors, setErrors] = useState({})
    const [addingNew, setAddingNew] = useState(false)

    const addNew = async () => {
        const loadingID = uuidv4()

        if (file)
            NotificationsStore.addNotification(loadingID, 'loading', 'Додається новина')

        const res = await fetch(`http://localhost:5000/InsertedNews?title=${inputName.value}&description=${inputDesc.value}&content=${textareaDesc.value}`, {
            method: 'POST',
            body: file,
        })

        if (res.status === 200) {
            const addedNewID = uuidv4()

            inputName.setNewValue('')
            inputDesc.setNewValue('')
            textareaDesc.setNewValue('')

            NotificationsStore.addNotification(addedNewID, 'success', 'Новина успішно додана')
            NotificationsStore.removeNotification(3000, addedNewID)
        } else {
            const errorID = uuidv4()

            NotificationsStore.addNotification(errorID, 'error', 'Помилка додавання')
            NotificationsStore.removeNotification(3000, errorID)
        }

        if (file)
            NotificationsStore.removeNotification(0, loadingID)
    }

    const checkInputs = async () => {
        const inputsInfo = [
            {el: inputName, errorName: 'newName', errorText: 'Введіть назву новини'},
            {el: inputDesc, errorName: 'shortDesc', errorText: 'Введіть короткий опис'},
            {el: textareaDesc, errorName: 'fullDesc', errorText: 'Введіть опис'},
        ]

        if (checkErrors(setErrors, inputsInfo)) return

        setAddingNew(true)
        await addNew()
        setAddingNew(false)
    }

    return (
        <PageWrapper title={'Додати новину'}>
            <div className={styles.addNew}>
                <Form className={styles.addNewForm} onSubmit={checkInputs}>
                    <Input type={'text'} label={'Назва новини'} id={'newName'} {...inputName} error={errors.newName}/>
                    <Input type={'text'} label={'Короткий опис'} id={'shortDesc'} {...inputDesc}
                           error={errors.shortDesc}/>
                    {/*<Input label={'Детальний опис'} id={'fullDesc'} textarea {...textareaDesc} error={errors.fullDesc}/>*/}
                    <RichTextEditor label={'Детальний опис'} />
                    <UploadFile className={styles.addNewUpload} label={'Прикріпити фото'} setFile={setFile}/>
                    <div className={styles.addNewActions}>
                        <Btn
                            className={styles.addNewActionsBtn}
                            type={'button'}
                            onClick={() => navigate('/news')}
                            red
                            disable={addingNew}
                        >
                            Відмінити
                        </Btn>
                        <Btn className={styles.addNewActionsBtn} type={'submit'} disable={addingNew}>
                            Додати
                        </Btn>
                    </div>
                </Form>
            </div>
        </PageWrapper>
    )
}
