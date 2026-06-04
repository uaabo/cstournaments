import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span>⚡</span>
              CS<span>Tournaments</span>
            </Link>
            <p className="footer__tagline">
              O portal definitivo de Counter-Strike 2.<br />
              Todos os torneios. Todas as partidas. Tudo num só lugar.
            </p>
          </div>

          {/* Nav columns */}
          <div className="footer__nav">
            <div className="footer__col">
              <h4>Navegar</h4>
              <Link to="/">Home</Link>
              <Link to="/tournaments">Torneios</Link>
              <Link to="/matches">Partidas</Link>
              <Link to="/teams">Equipas</Link>
              <Link to="/rankings">Rankings</Link>
            </div>
            <div className="footer__col">
              <h4>Torneios</h4>
              <a href="#">IEM Cologne 2025</a>
              <a href="#">ESL Pro League S21</a>
              <a href="#">BLAST Premier Spring</a>
              <a href="#">PGL Major 2025</a>
            </div>
            <div className="footer__col">
              <h4>Recursos</h4>
              <a href="#">Sobre Nós</a>
              <a href="#">API Pública</a>
              <a href="#">Parceiros</a>
              <a href="#">Contacto</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © 2025 CSTournaments. Todos os direitos reservados.
            <span> · </span>
            Dados mockados para fins de demonstração.
          </p>
          <div className="footer__legal">
            <a href="#">Privacidade</a>
            <a href="#">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
