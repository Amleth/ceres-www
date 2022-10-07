import { graphql } from 'gatsby'
import * as React from 'react'

const Search = (props) => {
    console.log(props)
    return "🦕"
}

export const SearchQuery = graphql`
  query SearchQuery {
    allMarkdownRemark {
        totalCount
        nodes {
            frontmatter {
                author
                tags
                title
            }
            rawMarkdownBody
            fields {
                collection
                date
                slug
            }
        }
    }
  }
`

export default Search