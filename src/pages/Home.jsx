import { Link } from 'react-router-dom'
import { fetchLiveMatches, fetchUpcomingMatches, fetchRecentMatches, fetchLiveTournaments, fetchUpcomingTournaments } from '../data/api'
import { transformMatch, transformTournament } from '../data/transform'
import { useApi } from '../hooks/useApi'
import { matches as mockMatches, tournaments as mockTournaments, liveStats } from '../data/mockData'
import MatchCard from '../components/MatchCard'
import TournamentCard from '../components/TournamentCard'
import './Home.css'

const tickerItems = [
  'ESL Pro League S21 — Ao Vivo',
  'BLAST Premier Spring — Ao Vivo',
  'IEM Cologne 2025 — 1 Jul',
  'NAVI vence Astralis 2–0',
  'G2 vence Vitality 2–1',
  'Cloud9 surpreende FaZe 2–0',
  'Rankings atualizados — Junho 2025',
]

export default function Home() {
  const live     = useApi(fetchLiveMatches,         transformMatch,       30_000,  mockMatches.filter(m => m.status === 'live'))
  const upcoming = useApi(fetchUpcomingMatches,      transformMatch,       60_000,  mockMatches.filter(m => m.status === 'upcoming'))
  const results  = useApi(fetchRecentMatches,        transformMatch,       120_000, mockMatches.filter(m => m.status === 'finished'))
  const liveTour = useApi(fetchLiveTournaments,      transformTournament,  60_000,  mockTournaments.filter(t => t.status === 'live'))
  const upTour   = useApi(fetchUpcomingTournaments,  transformTournament,  300_000, mockTournaments.filter(t => t.status === 'upcoming'))

  const liveMatches    = (live.data     || []).slice(0, 3)
  const upcomingMatches = (upcoming.data || []).slice(0, 3)
  const recentMatches  = (results.data  || []).slice(0, 3)
  const featuredTournaments = [...(liveTour.data || []), ...(upTour.data || [])].slice(0, 3)

  const statsLive = live.data?.length ?? liveStats.live_matches
  const statsUpcoming = upcoming.data?.length ?? liveStats.upcoming_today

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
            <div className="hero__stat">
              <span className="hero__stat-value">{featuredTournaments.length || liveStats.active_tournaments}</span>
              <span className="hero__stat-label">Torneios</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-value">{liveStats.total_prize}</span>
              <span className="hero__stat-label">Prize Total</span>
            </div>
          </div>
          <div className="hero__ctas">
            <Link to="/matches" className="btn btn--primary">Ver Partidas Ao Vivo</Link>
            <Link to="/tournaments" className="btn btn--ghost">Torneios →</Link>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="ticker__item">
              <span className="ticker__dot" />{item}
            </span>
          ))}
        </div>
      </div>

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
            <h2 className="section-title">Próximos Jogos</h2>
            <Link to="/matches" className="view-all">Ver todos →</Link>
          </div>
          <div className="grid-3">
            {upcomingMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>
      </section>

      {/* ── RECENT RESULTS ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Resultados Recentes</h2>
            <Link to="/matches" className="view-all">Ver todos →</Link>
          </div>
          <div className="grid-3">
            {recentMatches.map(m => <MatchCard key={m.id} match={m} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURNAMENTS ── */}
      <section className="section home__upcoming">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Torneios em Destaque</h2>
            <Link to="/tournaments" className="view-all">Ver todos →</Link>
          </div>
          <div className="grid-3">
            {featuredTournaments.map(t => <TournamentCard key={t.id} tournament={t} />)}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className="home__cta-banner">
        <div className="home__cta-inner">
          <div>
            <h2 className="home__cta-title">Rankings mundiais CS2</h2>
            <p className="home__cta-sub">As melhores equipas do mundo, classificadas por pontos</p>
          </div>
          <Link to="/rankings" className="btn--white">Ver Rankings →</Link>
        </div>
      </div>
    </div>
  )
}
