import gql from "graphql-tag"

export const GET_TEACHER_BY_ID = gql`
    query ($id: Int!) {
        teachers (where: {id: {eq: $id}}) {
            id
            firstName
            secondName
            middleName
            headerImageStorageUrl
            headerImageName
            blocks {
                id
                name
                content
            }
        }
    }
`
