import gql from 'graphql-tag'

export const MODIFY_NEW = gql`
    mutation ($title: String, $description: String, $content: String, $image_url: String) {
        modify_new(objects:{
            title: $title,
            description: $description,
            content: $content,
            image_url: $image_url,
        }){
            id
        }
    }
`
