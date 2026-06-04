import './TournamentCard.css'

// Formats date range
function formatDateRange(start, end) {
  const s = new Date(start)
  const e = new Date(end)
  const opts = { day: '2-digit', month: 'short', year: 'numeric' }
  return `${s.toLocaleDateString('pt-PT', opts)} — ${e.toLocaleDateString('pt-PT', opts)}`
}

const tierColors = { S: '#ff6b1a', A: '#1a8cff', B: '#8a95a3' }

export default function TournamentCard({ tournament }) {
  const { name, organizer, prize_pool, location, start_date, end_date, status, tier, teams_count, winner, format } = tournament

  return (
    <div className="t-card card">
      {/* Tier badge */}
      <div className="t-card__tier" style={{ '--tier-color': tierColors[tier] || '#8a95a3' }}>
        TIER {tier}
      </div>

      {/* Header */}
      <div className="t-card__header">
        <div className="t-card__logo">🏆</div>
        <div className="t-card__info">
          <h3 className="t-card__name">{name}</h3>
          <span className="t-card__organizer">{organizer}</span>
        </div>
        <span className={`badge ${status}`}>
          {status === 'live' ? 'Ao Vivo' : status === 'upcoming' ? 'Próximo' : 'Terminado'}
        </span>
      </div>

      {/* Stats grid */}
      <div className="t-card__stats">
        <div className="t-card__stat">
          <span className="t-card__stat-label">Prize Pool</span>
          <span className="t-card__stat-value t-card__stat-value--prize">{prize_pool}</span>
        </div>
        <div className="t-card__stat">
          <span className="t-card__stat-label">Equipas</span>
          <span className="t-card__stat-value">{teams_count}</span>
        </div>
        <div className="t-card__stat">
          <span className="t-card__stat-label">Formato</span>
          <span className="t-card__stat-value t-card__stat-value--sm">{format}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="t-card__footer">
        <div className="t-card__dates">
          <span className="t-card__icon">📅</span>
          {formatDateRange(start_date, end_date)}
        </div>
        <div className="t-card__location">
          <span className="t-card__icon">📍</span>
          {location}
        </div>
        {winner && (
          <div className="t-card__winner">
            <span className="t-card__icon">🥇</span>
            {winner}
          </div>
        )}
      </div>
    </div>
  )
}
