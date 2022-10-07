import graphql from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'

const BlogPost = (props) => {
  console.log(props)
  return <Layout pageTitle="mon titre 🦖">coucou</Layout>
}

export const q = graphql`
  query MyQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
      fields {
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`

export default BlogPost