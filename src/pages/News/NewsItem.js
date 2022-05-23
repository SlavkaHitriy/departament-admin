import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

// Styles
import styles from './index.module.scss'

// Schemas
import { ADD_NEW } from '../../apollo-schemas/addNew'

const NewsItem = ({data, children}) => {

    const [addNewHook, {loading: addingNewLoading}] = useMutation(ADD_NEW)

    const [newData, setNewData] = useState({})

    const addNew = () => {
        addNewHook({
            variables: {
                title: newData.title,
                description: newData.description,
                content: newData.content,
                image_url: newData.image_url,
            },
        }).then(res => {
            console.log(res)
        })
    }


    console.log(addingNewLoading)
    console.log(setNewData)

    useEffect(() => {
        addNew()
    }, [])

    return (
        <div className={styles.newsItem}>
            <img className={styles.newsItemImg}
                 src={data.imageStorageUrl}
                 alt={data.imageName}
            />
            <div className={styles.newsItemContent}>
                <div className={styles.newsItemTitle}>
                    {data.title}
                </div>
                <div className={styles.newsItemDescription}>
                    {data.description}
                </div>
                <div className={styles.newsItemDate}>
                    {data.dateTime}
                </div>
            </div>
        </div>
    )
}

export default NewsItem
