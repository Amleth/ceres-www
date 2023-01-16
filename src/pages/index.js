import { graphql, Link } from "gatsby"
import * as React from 'react'
import Layout from '../components/layout'
import Miniature from '../images/4.jpg'
import Planet from '../images/5.png'
import { Tag } from "../components/layout"
import { Card } from "../components/card"
import {filterNodes} from "../helpers"

import "../style/accueil.css"

const Home = ({ data }) => {
    const nodes = data.allMarkdownRemark.nodes
    return (
        <Layout>
            {/* petite astuce pour passer une fonction qui rend le composant actuel au layout pour que le layout puisse passer les paramètres nécessaires au filtrage*/}
            {(toggleTag, tags, search) => { 
                const filtered = filterNodes(nodes, search, tags);
                return (
                    <div>
                        <HomeHeader />
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

const HomeHeader = () => (
        <header>
            <img id="landing-image" src={Planet} style={{maxWidth: "100%", margin: 0}}/>
            <h1 id="landing-title">Ceres</h1>
            <div id="landing-blocks-container">
                <div className="landing-block">
                    <h2>Expérimenter les méthodes numériques pour les sciences humaines et sociales</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna
                        aliqua. Proin fermentum leo vel orci porta non pulvinar. Maecenas accumsan lacus vel
                        facilisis
                        volutpat est velit
                        egestas dui. Interdum <a href="http://memes.sorbonne-universite.fr/">consectetur libero
                            id</a>
                        faucibus nisl tincidunt eget nullam non. Amet tellus
                        cras adipiscing enim
                        eu. Sed sed risus pretium quam vulputate dignissim suspendisse. Porta nibh venenatis cras
                        sed.
                        Urna duis convallis
                        convallis tellus id.</p>
                    <p> Dictum non consectetur a erat nam at. Urna et pharetra pharetra massa massa
                        ultricies. Dictum non
                        consectetur a erat nam at lectus urna. Dapibus ultrices in iaculis nunc sed augue lacus.
                        Convallis aenean et tortor at
                        risus viverra adipiscing at in. <a href="http://memes.sorbonne-universite.fr/">Vitae nunc
                            sed
                            velit dignissim</a> sodales. Rutrum quisque non
                        tellus orci ac. Sapien
                        faucibus et molestie ac feugiat sed lectus vestibulum mattis. Non blandit massa enim nec dui
                        nunc. Vulputate dignissim
                        suspendisse in est ante in nibh mauris. Velit scelerisque <a href="https://twitter.com">in
                            dictum non consectetur</a>.
                    </p>
                    <div id="buttons-container">
                        <a className="button" href="http://memes.sorbonne-universite.fr/">En savoir plus ↗</a>
                    </div>
                </div>
                <img className="landing-block" src={Planet} />
            </div>
        </header>
        )

export const query = graphql`
  query MyQuery {
    allMarkdownRemark(sort: {fields: fields___date, order: DESC}, filter: {fields: {date: {ne: null}}}, limit: 999) {
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

export default Home