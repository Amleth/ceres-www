import { graphql } from 'gatsby'
import React from 'react'
import { SKOS_PREFLABEL } from '../constants'
import { getRDFFrValue } from '../helpers'

const Concept = ({ pageContext }) => {
    return <>
        <h1>{getRDFFrValue(pageContext[SKOS_PREFLABEL])}</h1>
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