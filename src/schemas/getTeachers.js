import gql from "graphql-tag"

export const GET_TEACHERS = gql`
    query {
        teachers {
            id
            firstName
            secondName
            middleName
            headerImageStorageUrl
            headerImageName
        }
    }
`
