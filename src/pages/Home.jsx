import { Link } from 'react-router-dom'
import { fetchLiveMatches, fetchUpcomingMatches } from '../data/api'
import { transformMatch } from '../data/transform'
import { useApi } from '../hooks/useApi'
import { matches as mockMatches } from '../data/mockData'
import MatchCard from '../components/MatchCard'
import './Home.css'

export default function Home() {
  const live     = useApi(fetchLiveMatches,    transformMatch, 30_000, mockMatches.filter(m => m.status === 'live'))
  const upcoming = useApi(fetchUpcomingMatches, transformMatch, 60_000, mockMatches.filter(m => m.status === 'upcoming'))

  const liveMatches     = (live.data     || []).slice(0, 6)
  const upcomingMatches = (upcoming.data || []).slice(0, 6)

  const statsLive     = live.data?.length ?? 0
  const statsUpcoming = upcoming.data?.length ?? 0

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg-img" aria-hidden="true" />
        <div className="container hero__content">
          <div className="hero__eyebrow">
            <div className="hero__eyebrow-line" />
            <span className="hero__eyebrow-text">Counter-Strike 2 Esports Portal</span>
          </div>
          <h1 className="hero__title">
            <span className="hero__title-top">CS</span>
            <span className="hero__title-bottom">Tournaments</span>
          </h1>
          <p className="hero__subtitle">Todos os torneios de Counter-Strike num só lugar</p>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-value">{statsLive}</span>
              <span className="hero__stat-label">Ao Vivo</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">{statsUpcoming}</span>
              <span className="hero__stat-label">Hoje</span>
            </div>
          </div>
          <div className="hero__ctas">
            <Link to="/matches" className="btn btn--primary">Ver Partidas Ao Vivo</Link>
            <Link to="/tournaments" className="btn btn--ghost">Torneios →</Link>
          </div>
        </div>
      </section>

      {/* ── LIVE MATCHES ── */}
      {liveMatches.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title"><span>●</span> Ao Vivo Agora</h2>
              <Link to="/matches" className="view-all">Ver todos →</Link>
            </div>
            <div className="grid-3">
              {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING ── */}
      <section className="section home__upcoming">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Jogos de Hoje</h2>
            <Link to="/matches" className="view-all">Ver todos →</Link>
          </div>
          <div className="grid-3">
            {upcomingMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>
      </section>
    </div>
  )
}