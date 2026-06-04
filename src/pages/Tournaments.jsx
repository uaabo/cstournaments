import { useState } from 'react'
import { fetchLiveTournaments, fetchUpcomingTournaments, fetchPastTournaments } from '../data/api'
import { transformTournament } from '../data/transform'
import { useApi } from '../hooks/useApi'
import { tournaments as mockTournaments } from '../data/mockData'
import TournamentCard from '../components/TournamentCard'
import './PageCommon.css'

const filters = [
  { key: 'all',      label: 'Todos' },
  { key: 'live',     label: 'Ao Vivo' },
  { key: 'upcoming', label: 'Próximos' },
  { key: 'finished', label: 'Terminados' },
]

export default function Tournaments() {
  const [activeFilter, setActiveFilter] = useState('all')

  const live     = useApi(fetchLiveTournaments,     transformTournament, 60_000, mockTournaments.filter(t => t.status === 'live'))
  const upcoming = useApi(fetchUpcomingTournaments, transformTournament, 300_000, mockTournaments.filter(t => t.status === 'upcoming'))
  const past     = useApi(fetchPastTournaments,     transformTournament, 300_000, mockTournaments.filter(t => t.status === 'finished'))

  const allTournaments = [
    ...(live.data     || []).map(t => ({ ...t, status: 'live' })),
    ...(upcoming.data || []).map(t => ({ ...t, status: 'upcoming' })),
    ...(past.data     || []).map(t => ({ ...t, status: 'finished' })),
  ]

  const filtered = activeFilter === 'all'
    ? allTournaments
    : allTournaments.filter(t => t.status === activeFilter)

  const isLoading = live.loading || upcoming.loading || past.loading

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <p className="page-banner-eyebrow">CS2 Esports</p>
          <h1 className="page-banner-title">Torneios</h1>
          <p className="page-banner-meta">{allTournaments.length} torneios · Temporada 2025</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-tabs">
            {filters.map(f => {
              const count = f.key === 'all' ? allTournaments.length : allTournaments.filter(t => t.status === f.key).length
              return (
                <button key={f.key}
                  className={`filter-tab ${activeFilter === f.key ? 'filter-tab--active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                  <span className="filter-count">{count}</span>
                </button>
              )
            })}
          </div>

          {isLoading && <div className="api-loading">A carregar torneios...</div>}

          {!isLoading && (
            <div className="grid-3">
              {filtered.map(t => <TournamentCard key={t.id} tournament={t} />)}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="empty-state"><span>🏆</span><p>Nenhum torneio encontrado</p></div>
          )}
        </div>
      </section>
    </div>
  )
}
