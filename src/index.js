import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom"
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Styles
import './assets/styles/general.scss'
import './assets/styles/app.scss'

const client = new ApolloClient({
    uri: 'https://graphql.slivki-cat.com',
    cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Router>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </Router>
    </React.StrictMode>
)
