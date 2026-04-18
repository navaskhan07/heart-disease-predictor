import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">♥</span>
          <span>HeartCheck</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/predict" className={pathname === '/predict' ? 'active' : ''}>Predict</Link>
          <Link to="/history" className={pathname === '/history' ? 'active' : ''}>History</Link>
          <Link to="/about" className={pathname === '/about' ? 'active' : ''}>About</Link>
          <Link to="/predict" className="nav-cta">Check Risk</Link>
        </div>
      </div>
    </nav>
  )
}