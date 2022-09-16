import { graphql } from 'gatsby'
import React from 'react'
import { SKOS_PREFLABEL } from '../constants'

const Concept = ({ pageContext }) => {
    return <>
        <h1>{pageContext[SKOS_PREFLABEL].find(l => l["@language"] === "fr")["@value"]}</h1>
        <p>Coucou</p>
    </>
}

export const query = graphql`
    query ($id: String) {
        sitePage(id: {eq: $id}) {
            pageContext
        }
    }
`

export default Concept