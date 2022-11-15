import { graphql } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import '../style/article.css'

const BlogPost = ({ data, children }) => {
  const { author, title, tags, abstract } = data.markdownRemark.frontmatter
  return (
    <Layout>
      <main>
        <div id="toc-container">
          <nav dangerouslySetInnerHTML={{__html: data.markdownRemark.tableOfContents}} />
        </div>
        <div id="article-container">
          <header>
            <h1>{title}</h1>
            <span id="article-meta">Un billet écrit par {author} le {data.markdownRemark.fields.date}</span>
            <div id="tags-container">
              {tags ? tags.map(el => <a className="tag">{el}</a>) : ''}
            </div>
          </header>
          <article id="article">
            { abstract ? <aside><p>{abstract}</p></aside> : ''}
            <section class  Name="blog-content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          </article>
        </div>
      </main>
    </Layout>
  )
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
        abstract
      }
      fields {
        date(formatString: "DD MMMM, YYYY", locale: "fr")
        slug
        collection
      }
      tableOfContents
    }
  }
`

export default BlogPost