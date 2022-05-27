import React from 'react'
import { useQuery } from '@apollo/client'

// Styles
import styles from './index.module.scss'

// Schemas
import { GET_NEWS } from '../../schemas/getNews'

// Components
import NewsItem from './NewsItem'

export const News = () => {
    const {loading, error, data} = useQuery(GET_NEWS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className={styles.news}>
            {
                data.news.map(newsItem => (
                    <NewsItem data={newsItem} key={newsItem.id} />
                ))
            }
        </div>
    )
}
