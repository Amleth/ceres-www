const path = require(`path`)

const thesaurus = require(`./src/data/thesaurus.json`)

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    for (const concept of thesaurus) {
        const id = concept["http://purl.org/dc/terms/identifier"][0]["@value"]
        createPage({
            path: `/concept/${id}`,
            component: path.resolve(`src/templates/concept.jsx`),
            context: concept
        })
    }
}