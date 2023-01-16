import { graphql } from "gatsby"
import * as React from 'react'
import { LongCard } from "../components/longcard"
import Layout from '../components/layout'
import { filterNodes } from "../helpers"
import "../style/accueil.css"
import "../style/long-cards.css"

const CardsLayout = ({ data }) => {
    const nodes = data.allMarkdownRemark.nodes
    return (
        <Layout>
            {/* petite astuce pour passer une fonction qui rend le composant actuel au layout pour que le layout puisse passer les paramètres nécessaires au filtrage*/}
            {(toggleTag, tags, search) => { 
                const filtered = filterNodes(nodes, search, tags);
                const description = nodes.filter(node => node.fields.slug === "")[0]
                return (
                    <div>
                        {
                        description &&
                        (<header className="cards-header">
                                <h1>{description.frontmatter.title}</h1>
                                <p dangerouslySetInnerHTML={{ __html: description.html }} />
                        </header>
                        )
                        }
                        <div id="cards-wrapper">
                            <div id="cards-container">
                                {filtered.map(el => <LongCard postData={el} toggleTag={toggleTag} selectedTags={tags}/>)}
                            </div>
                        </div>
                    </div>
                )}
            }
        </Layout>
    )
}

export const query = graphql`
    query MyQuery($pageName: String = "") {
        allMarkdownRemark(
        sort: {fields: fields___date, order: DESC}
        filter: {fields: {collection: {eq: $pageName}}}
        limit: 999
        ) {
        nodes {
            html
            frontmatter {
            tags
            title
            author
            abstract
            }
            fields {
            date(formatString: "DD MMMM, YYYY", locale: "fr")
            slug
            collection
            image {
                publicURL
            }
            sound {
                publicURL
            }
            }
            excerpt
        }
    }
}
`

export default CardsLayout