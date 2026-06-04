import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/tournaments', label: 'Torneios' },
  { to: '/matches', label: 'Partidas' },
  { to: '/teams', label: 'Equipas' },
  { to: '/rankings', label: 'Rankings' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={() => setMenuOpen(false)}>
          <span className="navbar__logo-text">
            CS<span className="navbar__logo-accent">T</span>
          </span>
          <span className="navbar__logo-tag">CS2 Portal</span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map(({ to, label, exact }) => (
            <li key={to} style={{ height: '100%', display: 'flex' }}>
              <NavLink
                to={to}
                end={exact}
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <span className="navbar__live-badge">
            <span className="navbar__live-dot" />
            2 Live
          </span>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map(({ to, label, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) => `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
