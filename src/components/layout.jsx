import * as React from 'react'
import '../style/general.css'
import '../style/header.css'
// import { Link } from 'gatsby'

const menu = ['Accueil', '|', 'Tout', 'Projets', 'Outils', '|', 'Ateliers', 'Concepts']

const Layout = ({children }) => {
    return (
        <div id="page-container">
            <header>
                <nav id="header">
                    <a id="header-logo">Ceres</a>
                    {menu.map(el => el === '|' ? <hr className="header-div-v" /> : <a className="header-link">{el}</a>)}
                </nav>
                <hr id="header-div-h" />
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout