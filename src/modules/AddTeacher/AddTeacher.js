import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

// Styles
import styles from './index.module.scss'

// Hooks
import { useInput } from '../../core/hooks/useInput'

// Helpers
import { addTeacher } from '../../core/helpers/teachers/addTeacher'
import { checkInputs } from '../../core/helpers/teachers/checkInputs'
import { addName } from '../../core/helpers/teachers/addName'
import { addContent } from '../../core/helpers/teachers/addContent'
import { removeBlock } from '../../core/helpers/teachers/removeBlock'
import { addNewBlock } from '../../core/helpers/teachers/addNewBlock'

// Components
import { Form } from '../../core/ui/Form'
import { Input } from '../../core/ui/Input'
import { Btn } from '../../core/ui/Btn'
import { UploadFile } from '../../core/ui/UploadFile'
import { PageWrapper } from '../../core/ui/PageWrapper'
import { RichTextEditor } from '../../core/ui/RichTextEditor'

export const AddTeacher = () => {
    const navigate = useNavigate()

    const inputFirstName = useInput('')
    const inputSecondName = useInput('')
    const inputMiddleName = useInput('')
    const [fullContent, setFullContent] = useState([{id: uuidv4()}])
    const [file, setFile] = useState()

    const [errors, setErrors] = useState({})
    const [addingTeacher, setAddingTeacher] = useState(false)
    const [disabledAddBtn, setDisabledAddBtn] = useState(true)

    const checkErrors = async () => {
        if (await checkInputs(fullContent, {
            inputFirstName,
            inputSecondName,
            inputMiddleName,
        }, setErrors)) return

        setAddingTeacher(true)
        await addTeacher(fullContent, navigate, file, {
            inputFirstName,
            inputSecondName,
            inputMiddleName,
        })
        setAddingTeacher(false)
    }

    useEffect(() => {
        fullContent.forEach(block => {
            if (!block.name || Object.keys(block.content).length === 0) setDisabledAddBtn(true)
            else setDisabledAddBtn(false)
        })
    }, [fullContent])

    return (
        <PageWrapper title={'Додати викладача'}>
            <div className={styles.addTeacher}>
                <Form className={styles.addTeacherForm} onSubmit={checkErrors}>
                    <Input type={'text'} label={'Ім\'я'} id={'firstName'} {...inputFirstName} error={errors.firstName}/>
                    <Input type={'text'} label={'Прізвище'} id={'secondName'} {...inputSecondName}
                           error={errors.secondName}/>
                    <Input type={'text'} label={'По батькові'} id={'middleName'} {...inputMiddleName}
                           error={errors.middleName}/>
                    <div className={styles.addTeacherBlocks}>
                        {
                            fullContent.map(content => content.id && (
                                <div className={styles.addTeacherBox} key={content.id}>
                                    <Input
                                        type={'text'}
                                        label={'Назва блоку інформації'}
                                        id={`blockName${content.id}`}
                                        value={content.name ? content.name : ''}
                                        onChange={e => addName(fullContent, setFullContent, e, content.id)}
                                        error={errors[`contentName${content.id}`]}
                                    />
                                    <RichTextEditor
                                        className={styles.addTeacherContent}
                                        label={'Опис блоку інформації'}
                                        error={errors[`content${content.id}`]}
                                        setContent={newContent => addContent(fullContent, setFullContent, newContent, content.id)}
                                    />
                                    {
                                        fullContent.length !== 1 && (
                                            <Btn className={styles.addTeacherBoxDelete}
                                                 onClick={() => removeBlock(fullContent, setFullContent, content.id)}
                                                 type={'button'} red>
                                                -
                                            </Btn>
                                        )
                                    }
                                </div>
                            ))
                        }
                        <Btn className={styles.addTeacherNewBlock} disable={disabledAddBtn} onClick={() => addNewBlock(fullContent, setFullContent)}
                             type={'button'}>
                            +
                        </Btn>
                    </div>
                    <UploadFile className={styles.addTeacherUpload} label={'Прикріпити фото'} setFile={setFile}/>
                    <div className={styles.addTeacherActions}>
                        <Btn
                            className={styles.addTeacherActionsBtn}
                            type={'button'}
                            onClick={() => navigate('/teachers')}
                            red
                            disable={addingTeacher}
                        >
                            Відмінити
                        </Btn>
                        <Btn className={styles.addTeacherActionsBtn} type={'submit'} disable={addingTeacher}>
                            Додати
                        </Btn>
                    </div>
                </Form>
            </div>
        </PageWrapper>
    )
}
