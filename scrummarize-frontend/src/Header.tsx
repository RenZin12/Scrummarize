import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

function Header() {

  const [showNav, setShowNav] = useState(false)

  return (
    <header className="header">
        <div className="header__title-bar">
          <h1>Scrummarize</h1>
          <FontAwesomeIcon 
            icon={faBars}
            className="header__bar-icon"
            onClick={() => setShowNav(prevShowNav => !prevShowNav)}
          />
        </div>
        <nav className={showNav ? "header__nav" : "header__nav--hide"}>
          <Link to="/product-backlog" className="header__nav__link">Product Backlog</Link>
          <Link to="/sprint-board" className="header__nav__link">Sprint Board</Link>
        </nav>
    </header>
  )
}

export default Header
