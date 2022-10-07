import { graphql } from 'gatsby'
import * as React from 'react'

const Search = ({ data }) => {
    return "🦕"
}

export const SearchQuery = graphql`
  query SearchQuery($slug: String!) {
    {
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
  }
`

export default Search