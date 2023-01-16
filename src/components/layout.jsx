import * as React from 'react'
import '../style/general.css'
import '../style/header.css'
import '../style/footer.css'
import '../style/navtag.css'
import { Link, graphql, useStaticQuery } from "gatsby"

import Logo from '../images/logo.svg'

// import { Link } from 'gatsby'

const Layout = ( {children} ) => {
    const data = useStaticQuery(graphql`
        query GetPages{
            site {
                siteMetadata {
                    pages
                }
            }
            allMarkdownRemark {
                nodes {
                  frontmatter {
                    tags
                  }
                }
            }
        }
    `)
    const pages = data.site.siteMetadata.pages.map(page => {
        const name = page.split('_')[1]
        return {name: name[0].toUpperCase() + name.slice(1), link: `/${name}/`}
    })
    const menu = [{name: 'Accueil', link: '/'}, {name: '|'}, ...pages]
    const allTags = new Set(data.allMarkdownRemark.nodes.map(el => el.frontmatter.tags).filter(el => el !== null).flat())
    // TODO: ajouter la requête graphql qui récupèrera le thésaurus
    let [tags, setTags] = React.useState([]);
    let [search, setSearch] = React.useState("");
    let [open, setOpen] = React.useState(false);

    const toggleTag = (tag, nav=false) => {
        // TODO: ajouter coloration des enfants tags si il y en a
        // si le tag est déjà sélectionné on le déselectionne
        if(tags.indexOf(tag) !== -1){
            setTags(tags.filter(el => el != tag))
            // on referme le nav en déselectionnant le dernier tag sélectionné
            if(open && !nav && tags.length === 1){
                setOpen(false)
            }
        }
        // sinon c'est l'inverse
        else {
            setTags([...tags, tag])
            if(!open){
                setOpen(true)
            }
        }
    }
    return (
        <>
            <LeftNav allTags={[...allTags]} selectedTags={tags} toggleTag={toggleTag} search={search} setSearch={setSearch} open={open} setOpen={setOpen}/>
            <div id="page-container">
                <Header menu={menu}/>
                <main>
                    {typeof children === "function" ? children(toggleTag, tags, search) : children}
                </main>
                <Footer />
            </div>
        </>
    )
}

const Header = ({menu}) => <header>
    <nav id="header">
        <a id="header-logo" href="/">Ceres</a>
        {menu.map((el, i) => !el.link ? <hr className="header-div-v" key={i}/> : <Link className="header-link" key={i} to={el.link}>{el.name}</Link>)}
    </nav>
    <hr id="header-div-h" />
</header>

const Footer = () => (
<footer id="footer">
    <div className="footer-block">
        <p>CERES — Centre d'expérimentation en méthodes numériques pour les recherches en sciences humaines et
            sociales</p>
        <p>Faculté des Lettres de Sorbonne Université</p>
        <img className="logo" src={Logo} />
    </div>
    <div className="footer-block">
        <p> Pour nous rendre visite : Maison de la Recherche, 28 rue Serpente,
            75006 Paris, Bureau S007.
        </p>
        <p>Pour nous contacter : <a href="mailto:lettres-ceres@sorbonne-universite.fr">lettres-ceres@sorbonne-universite.fr</a></p>
        <p><a href="http://memes.sorbonne-universite.fr/">Mentions légales</a></p>
    </div>
</footer> )

export const Tag = ({tagName, selectedTags, toggleTag, nav=false}) => 
    <a className={"small-tag" + (selectedTags.indexOf(tagName) !== -1 ? " selected" : "")} onClick={() => toggleTag(tagName, nav)}>{tagName}</a>


const LeftNav = ({allTags, open, setOpen, selectedTags, toggleTag, search, setSearch}) => {
    console.log(allTags)
    return (
        <div id="tags-panel-container" style={{left: open ? '1rem' : '-18rem', 'padding-right': open ? '1rem' : '0.5rem'}}>
            <nav id="tags-panel">
                <div id="title-button-container">
                    <p style={{visibility: open ? 'visible' : 'hidden' }}>
                        <strong>Recherche de contenus par concepts</strong>
                    </p>
                    <a className="arrow" onClick={() => setOpen(!open)}> {open ? '←' : '→'}</a>
                </div>
                <div id="tags-panel-text" style={{visibility: open ? 'visible' : 'hidden' }}>
                    <p>Cliquez sur les concepts pour les inclure dans la recherche, cliquez sur les flèches pour afficher les sous-concepts.</p>
                    <input type="text" placeholder="Recherche dans le texte" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <hr style={{visibility: open ? 'visible' : 'hidden' }} />
                <div id="tags-panel-tree" style={{visibility: open ? 'visible' : 'hidden' }}>
                    {/* <div className="parent-tag-container">
                        <Tag tagName="toto" selectedTags={selectedTags} toggleTag={toggleTag} nav={true}/>
                        <div className="parent-arrow" onclick="display_subconcepts(this)"></div>
                    </div> */}
                    <div className="wild-tags">
                        {allTags.map(el => <Tag tagName={el} selectedTags={selectedTags} toggleTag={toggleTag} nav={true}/>)}
                    </div>
                    {/* <div className="parent-tag-container">
                        <a className="small-tag" onclick="select_tag(this)">Climate</a>
                        <div className="parent-arrow" onclick="display_subconcepts(this)"></div>
                    </div> */}
                </div>
            </nav>
        </div>
    )
}

export default Layout