import * as React from 'react'
import '../style/general.css'
import '../style/header.css'
import '../style/footer.css'
import '../style/navtag.css'
import { Link } from "gatsby"

import Logo from '../images/logo.svg'

// import { Link } from 'gatsby'

const menu = [{name: 'Accueil', link: '/'}, {name: '|'}, {name:'Tout', link: '/'}, {name: 'Projets', link: '/blog'}, 
            {name: 'Outils', link: '/outils'}, {name: 'Ateliers', link: '/ateliers'}, {name: 'Podcasts', link: '/podcasts'}, 
            {name: '|'}, {name: 'À propos', link: '/about'}, { name: 'Equipe', link: '/membres'}, {name: 'Contact', link: '/'}, 
            {name: '|' }, {name: 'Contrats et Stages', link: '/offres'}]

const Layout = ( { children} ) => {
    let [tags, setTags] = React.useState([]);

    const toggleTag = (tag) => {
        if(tags.indexOf(tag) !== -1){
            setTags(tags.filter(el => el != tag))
        }
        else {
            setTags([...tags, tag])
        }
    }
    return (
        <>
            <LeftNav selectedTags={tags} toggleTag={toggleTag}/>
            <div id="page-container">
                <Header />
                <main>
                    {typeof children === "function" ? children(toggleTag, tags) : children}
                </main>
                <Footer />
            </div>
        </>
    )
}

const Header = () => <header>
    <nav id="header">
        <a id="header-logo">Ceres</a>
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

export const Tag = ({tagName, selectedTags, toggleTag}) => 
    <a className={"small-tag" + (selectedTags.indexOf(tagName) !== -1 ? " selected" : "")} onClick={() => toggleTag(tagName)}>{tagName}</a>


const LeftNav = ({selectedTags, toggleTag}) => {
    let [open, setOpen] = React.useState(false)
    return (
        <div id="tags-panel-container" style={{left: open ? '1rem' : '-18rem', 'padding-right': open ? '1rem' : '0.5rem'}}>
            <nav id="tags-panel">
                <div id="title-button-container">
                    <p style={{visibility: open ? 'visible' : 'hidden' }}><strong>Recherche de contenus par concepts</strong></p>
                    <a className="arrow" onClick={() => setOpen(!open)}> {open ? '←' : '→'}</a>
                </div>
                <div id="tags-panel-text" style={{visibility: open ? 'visible' : 'hidden' }}>
                    <p>Cliquez sur les concepts pour les inclure dans la recherche, cliquez sur les flèches pour afficher
                        les
                        sous-concepts</p>
                    <input type="text" placeholder="Recherche dans le texte" />
                    <a className="button">Lancer la recherche -&gt;</a>
                </div>
                <hr style={{visibility: open ? 'visible' : 'hidden' }} />
                <div id="tags-panel-tree" style={{visibility: open ? 'visible' : 'hidden' }}>
                    <div className="parent-tag-container">
                        <Tag tagName="toto" selectedTags={selectedTags} toggleTag={toggleTag} />
                        <div className="parent-arrow" onclick="display_subconcepts(this)"></div>
                    </div>
                    <div className="tag-list">
                        <a className="small-tag" onclick="select_tag(this)">Pie</a>
                        <a className="small-tag" onclick="select_tag(this)">Method</a>
                        <a className="small-tag" onclick="select_tag(this)">Teacher</a>
                    </div>
                    <div className="parent-tag-container">
                        <a className="small-tag" onclick="select_tag(this)">Climate</a>
                        <div className="parent-arrow" onclick="display_subconcepts(this)"></div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Layout