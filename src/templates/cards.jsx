import { graphql } from "gatsby"
import * as React from 'react'
import { Card } from "../components/card"
import Layout from '../components/layout'
import { filterNodes } from "../helpers"
import "../style/accueil.css"

const CardsLayout = ({ data }) => {
    const nodes = data.allMarkdownRemark.nodes
    return (
        <Layout>
            {/* petite astuce pour passer une fonction qui rend le composant actuel au layout pour que le layout puisse passer les paramètres nécessaires au filtrage*/}
            {(toggleTag, tags, search) => { 
                const filtered = filterNodes(nodes, search, tags);
                return (
                    <div>
                        <div id="last-posts-wrapper">
                            <h2 id="last-posts">Dernières publications</h2>
                            <div id="cards-wrapper">
                                <div id="cards-container">
                                    {filtered.map(el => <Card postData={el} toggleTag={toggleTag} selectedTags={tags}/>)}
                                </div>
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
        filter: {fields: {date: {ne: null}, collection: {eq: $pageName}}}
        limit: 999
        ) {
        nodes {
            frontmatter {
            tags
            title
            author
            abstract
            }
            fields {
            date(formatString: "DD MMMM, YYYY", locale: "fr")
            slug
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