const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

const thesaurus = require(`./src/data/thesaurus.json`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    ////////////////////////////////////////////////////////////////////////////////
    // BLOG POSTS
    ////////////////////////////////////////////////////////////////////////////////

    const blogPost = path.resolve(`./src/templates/blog-post.jsx`)
    const result = await graphql(
        `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
    )

    if (result.errors) {
        throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
        const previous = index === posts.length - 1 ? null : posts[index + 1].node
        const next = index === 0 ? null : posts[index - 1].node

        createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
                slug: post.node.fields.slug,
                previous,
                next,
            },
        })
    })

    ////////////////////////////////////////////////////////////////////////////////
    // THESAURUS
    ////////////////////////////////////////////////////////////////////////////////

    for (const concept of thesaurus) {
        const id = concept["http://purl.org/dc/terms/identifier"][0]["@value"]
        createPage({
            path: `/concept/${id}`,
            component: path.resolve(`src/templates/concept.jsx`),
            context: concept
        })
    }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode })
        createNodeField({
            name: `slug`,
            node,
            value,
        })

        const parent = getNode(node.parent)
        let collection = parent.sourceInstanceName
        createNodeField({
            node,
            name: "collection",
            value: collection,
        })
    }
}