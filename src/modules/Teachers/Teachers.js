import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { observer } from 'mobx-react-lite'

// Styles
import styles from './index.module.scss'

// Schemas
import { GET_TEACHERS } from '../../schemas/getTeachers'

// Store
import { TeachersStore } from '../../store'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'
import { TeacherItem } from './TeacherItem'
import { Loader } from '../../core/info/Loader'
import { NoItems } from '../../core/info/NoItems'

export const Teachers = observer(() => {
    const {data, loading, error} = useQuery(GET_TEACHERS, {
        fetchPolicy: 'no-cache',
    })

    useEffect(() => {
        if (data)
            TeachersStore.setTeachers(data.teachers)
    }, [data])

    if (error) return <div>{error}</div>

    return (
        <PageWrapper title={'Викладачі'} addTeacher={true}>
            {
                loading ? <Loader/> :
                    TeachersStore.teachers.length > 0 ? (
                        <div className={styles.teachers}>
                            {
                                TeachersStore.teachers.map(teacher => (
                                    <TeacherItem key={teacher.id} data={teacher}/>
                                ))
                            }
                        </div>
                    ) : <NoItems text={'-- немає викладачів --'}/>
            }
        </PageWrapper>
    )
})
