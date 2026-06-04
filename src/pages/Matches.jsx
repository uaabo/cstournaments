import { useState } from 'react'
import { fetchLiveMatches, fetchUpcomingMatches, fetchRecentMatches } from '../data/api'
import { transformMatch } from '../data/transform'
import { useApi } from '../hooks/useApi'
import { matches as mockMatches } from '../data/mockData'
import MatchCard from '../components/MatchCard'
import './PageCommon.css'

const filters = [
  { key: 'all',      label: 'Todos' },
  { key: 'live',     label: 'Ao Vivo' },
  { key: 'upcoming', label: 'Próximos' },
  { key: 'finished', label: 'Resultados' },
]

export default function Matches() {
  const [activeFilter, setActiveFilter] = useState('all')

  // Fetch cada categoria separadamente com auto-refresh
  const live     = useApi(fetchLiveMatches,    transformMatch, 30_000, mockMatches.filter(m => m.status === 'live'))
  const upcoming = useApi(fetchUpcomingMatches, transformMatch, 60_000, mockMatches.filter(m => m.status === 'upcoming'))
  const results  = useApi(fetchRecentMatches,  transformMatch, 120_000, mockMatches.filter(m => m.status === 'finished'))

  const allMatches = [
    ...(live.data     || []).map(m => ({ ...m, status: 'live' })),
    ...(upcoming.data || []).map(m => ({ ...m, status: 'upcoming' })),
    ...(results.data  || []).map(m => ({ ...m, status: 'finished' })),
  ]

  const filtered = activeFilter === 'all'
    ? allMatches
    : allMatches.filter(m => m.status === activeFilter)

  const isLoading = live.loading || upcoming.loading || results.loading
  const hasError  = live.error && upcoming.error && results.error

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <p className="page-banner-eyebrow">CS2 Esports</p>
          <h1 className="page-banner-title">Partidas</h1>
          <p className="page-banner-meta">
            {live.data?.length || 0} ao vivo · {upcoming.data?.length || 0} próximas
            {hasError && ' · ⚠ A usar dados locais'}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="filter-tabs">
            {filters.map(f => {
              const count = f.key === 'all' ? allMatches.length : allMatches.filter(m => m.status === f.key).length
              return (
                <button
                  key={f.key}
                  className={`filter-tab ${activeFilter === f.key ? 'filter-tab--active' : ''}`}
                  onClick={() => setActiveFilter(f.key)}
                >
                  {f.label}
                  {f.key === 'live' && (live.data?.length > 0) && activeFilter !== 'live' && (
                    <span className="filter-tab__live-dot" />
                  )}
                  <span className="filter-count">{count}</span>
                </button>
              )
            })}
          </div>

          {isLoading && <div className="api-loading">A carregar partidas...</div>}

          {!isLoading && (
            <div className="grid-3">
              {filtered.map(m => <MatchCard key={m.id} match={m} />)}
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="empty-state"><span>🎮</span><p>Nenhuma partida encontrada</p></div>
          )}
        </div>
      </section>
    </div>
  )
}
