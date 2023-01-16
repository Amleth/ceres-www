const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require('fs')
const thesaurus = require(`./src/data/thesaurus.json`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  ////////////////////////////////////////////////////////////////////////////////
  // BLOG POSTS
  ////////////////////////////////////////////////////////////////////////////////

  const result = await graphql(
    `
      {
        site {
          siteMetadata {
            pages
          }
        }
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

  // Create all main pages except Accueil
  const pagesToCreate = result.data.site.siteMetadata.pages

  pagesToCreate.forEach(page => {
    console.log(page)
    const [template, pageName] = page.split('_')
    createPage({
      path: `/${pageName}/`,
      component: path.resolve(`./src/templates/${template}.jsx`),
      context: {
        pageName: pageName
      },
    })
  })

  // Create all pages with the same template, this might change later if we want to do markdown pages with specifics templates
  const posts = result.data.allMarkdownRemark.edges.filter(el => el.node.fields.collection === 'blog')

  result.data.allMarkdownRemark.edges.forEach((edge, index) => {
    const fields = edge.node.fields
    const collection = fields.collection

    if(fields.slug === ""){
      return
    }
    // const previous = index === posts.length - 1 ? null : posts[index + 1].node
    // const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/${collection}/` + fields.slug,
      component: path.resolve(`./src/templates/blog-post.jsx`),
      context: {
        slug: fields.slug,
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

    // console.log(createFilePath({node, getNode}))

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

    const files = fs.readdirSync(path.dirname(node.fileAbsolutePath)).filter(el => el !== 'index.md')
    const images = files.filter(el => el.endsWith('.png') || el.endsWith('.jpeg') || el.endsWith('.jpg'))
    const sounds = files.filter(el => el.endsWith('.mp3') || el.endsWith('.wav') || el.endsWith('.ogg'))
    
    createNodeField({
      node: node,
      name: "image",
      value: images[0] ?? null
    })

    createNodeField({
      node: node,
      name: "sound",
      value: sounds[0] ?? null
    })
  }
}