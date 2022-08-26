import gql from "graphql-tag"

export const GET_NEW_BY_ID = gql`
    query ($id: Int!) {
        news (where: {id: {eq: $id}}) {
            id
            title
            description
            content
            headerImageName
            headerImageStorageUrl
        }
    }
`
