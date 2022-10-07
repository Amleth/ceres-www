import { graphql } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'

const BlogPost = ({ data, children }) => {
  return <Layout pageTitle={data.markdownRemark.frontmatter.title}>
    <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </Layout>
}

export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        author
        title
        tags
      }
      fields {
        date(formatString: "MMMM DD, YYYY")
        slug
        collection
      }
    }
  }
`

export default BlogPost