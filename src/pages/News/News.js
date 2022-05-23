import React from 'react'
import { useQuery } from '@apollo/client'

// Schemas
import { GET_NEWS } from '../../apollo-schemas/getNews'

// Components
import NewsItem from './NewsItem'

const News = () => {
    const {loading, error, data} = useQuery(GET_NEWS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            {
                data.getNews.map(newsItem => (
                    <NewsItem data={newsItem} key={newsItem.id} />
                ))
            }
        </div>
    )
}

export default News
