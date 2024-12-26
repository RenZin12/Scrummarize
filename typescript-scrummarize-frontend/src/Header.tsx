import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Header() {
  return (
    <header className="header">
        <h1>Scrummarize</h1>
        <FontAwesomeIcon icon={faBars} className="header__user-icon"/>
    </header>
  )
}

export default Header
