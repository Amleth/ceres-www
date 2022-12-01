const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

const thesaurus = require(`./src/data/thesaurus.json`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  ////////////////////////////////////////////////////////////////////////////////
  // BLOG POSTS
  ////////////////////////////////////////////////////////////////////////////////

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [fields___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                date
                collection
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

  // createRedirect({
  //   fromPath: `/`,
  //   toPath: `/home/`
  // })

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges.filter(el => el.node.fields.collection === 'blog-posts')
  const members = result.data.allMarkdownRemark.edges.filter(el => el.node.fields.collection === 'membres')

  console.log(posts.length)

  posts.forEach((post, index) => {
    // const previous = index === posts.length - 1 ? null : posts[index + 1].node
    // const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: '/blog/' + post.node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        slug: post.node.fields.slug,
        // previous,
        // next,
      },
    })
  })

  ////////////////////////////////////////////////////////////////////////////////
  // THESAURUS
  ////////////////////////////////////////////////////////////////////////////////

  // for (const concept of thesaurus) {
  //   const id = concept["http://purl.org/dc/terms/identifier"][0]["@value"]
  //   createPage({
  //     path: `/concept/${id}`,
  //     component: path.resolve(`src/templates/concept.jsx`),
  //     context: concept
  //   })
  // }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {

    const slug = createFilePath({ node, getNode }).replace('/', '')

    createNodeField({
      node: node,
      name: `slug`,
      value: slug,
    })

    const date = slug.split('_')[0]

    // on ne créé la date que si elle est présente dans le slug
    if(date.match(/\d{4}-\d{2}-\d{2}/)){
      createNodeField({
        node: node,
        name: `date`,
        value: date,
      })
    }

    const parent = getNode(node.parent)
    const collection = parent.sourceInstanceName

    createNodeField({
      node: node,
      name: `collection`,
      value: collection,
    })
    console.log(collection)
  }
}