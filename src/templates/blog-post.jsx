import { graphql } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import '../style/article.css'

const BlogPost = ({ data, children }) => {
  const { author, title, tags, abstract } = data.markdownRemark.frontmatter
  const authorName = data.site.siteMetadata.authors.find(el => el.id === author).name
  return (
    <Layout>
      <main>
        <div id="toc-container">
          <nav dangerouslySetInnerHTML={{__html: data.markdownRemark.tableOfContents}} />
        </div>
        <div id="article-container">
          <header>
            <h1>{title}</h1>
            <span id="article-meta">Un billet écrit par {authorName} le {data.markdownRemark.fields.date}</span>
            <div id="tags-container">
              {tags ? tags.map((el, i) => <a className="tag" key={i}>{el}</a>) : ''}
            </div>
          </header>
          <article id="article">
            { abstract ? <aside><p>{abstract}</p></aside> : ''}
            <section className="blog-content" dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
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
        title,
        authors {
          id,
          name
        }
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