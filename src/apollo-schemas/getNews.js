import gql from "graphql-tag"

export const GET_NEWS = gql`
    query {
        getNews {
            id
            title
            description
            content
            dateTime
            imageStorageUrl
            imageName
        }
    }
`
