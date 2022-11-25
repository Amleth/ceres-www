import { graphql, Link } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import Miniature from '../images/4.jpg'
import { Tag } from "../components/layout"
import "../style/accueil.css"

const Home = ({ data }) => {
    const nodes = data.allMarkdownRemark.nodes
    return (
        <Layout>
            {(toggleTag, tags) => {console.log(tags); return(
            <div id="last-posts-wrapper">
                <h2>Dernières publications</h2>
                <div id="cards-wrapper">
                    <div id="cards-container">
                        {nodes.map(el => <Card postData={el} toggleTag={toggleTag} selectedTags={tags}/>)}
                    </div>
                </div>
            </div>)}
        }
        </Layout>
    )
}


const Card = ({postData, toggleTag, selectedTags}) => {
    console.log(selectedTags)
    const {date, slug} = postData.fields
    const {title, tags, abstract} = postData.frontmatter

    return (
    <div className="card">
        <Link className="card-link" to={"/blog/" + slug}/>
        <img src={Miniature} />
        <h4>{title}</h4>
        <div class="small-tags-container">
            {tags ? tags.map(t => <Tag tagName={t} selectedTags={selectedTags} toggleTag={toggleTag} />) : ""}
        </div>
        <p className="date">
            <time datetime={date}>{date}</time>
        </p>
        <p class="text-sample">
            {abstract ? abstract : postData.excerpt}
        </p>
        </div>
    )
}

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: {fields: fields___date, order: DESC}, filter: {}, limit: 10) {
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
            }
            excerpt
        }
    }
}

`

export default Home