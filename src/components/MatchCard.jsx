import './MatchCard.css'

// Formats a date/time string to a readable format
function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: 'short' })
}

function formatTime(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
}

export default function MatchCard({ match }) {
  const isLive = match.status === 'live'
  const isFinished = match.status === 'finished'
  const isUpcoming = match.status === 'upcoming'

  const winner = isFinished ? match.winner : null

  return (
    <div className={`match-card card ${isLive ? 'match-card--live' : ''}`}>
      {/* Header */}
      <div className="match-card__header">
        <span className="match-card__tournament">{match.tournament}</span>
        <span className={`badge ${match.status}`}>
          {isLive ? 'Ao Vivo' : isFinished ? 'Terminado' : 'Próximo'}
        </span>
      </div>

      {/* Teams row */}
      <div className="match-card__teams">
        {/* Team 1 */}
        <div className={`match-card__team ${winner === match.team1.name ? 'match-card__team--winner' : ''} ${winner && winner !== match.team1.name ? 'match-card__team--loser' : ''}`}>
          <span className="match-card__team-logo">{match.team1.logo}</span>
          <span className="match-card__team-name">{match.team1.name}</span>
        </div>

        {/* Score / VS */}
        <div className="match-card__score">
          {isUpcoming ? (
            <div className="match-card__vs">
              <span>VS</span>
              <span className="match-card__time">{formatTime(match.date)}</span>
            </div>
          ) : (
            <div className="match-card__scoreboard">
              <span className={match.score1 > match.score2 ? 'score--win' : match.score1 < match.score2 ? 'score--loss' : ''}>
                {match.score1}
              </span>
              <span className="score-sep">:</span>
              <span className={match.score2 > match.score1 ? 'score--win' : match.score2 < match.score1 ? 'score--loss' : ''}>
                {match.score2}
              </span>
            </div>
          )}
        </div>

        {/* Team 2 */}
        <div className={`match-card__team match-card__team--right ${winner === match.team2.name ? 'match-card__team--winner' : ''} ${winner && winner !== match.team2.name ? 'match-card__team--loser' : ''}`}>
          <span className="match-card__team-name">{match.team2.name}</span>
          <span className="match-card__team-logo">{match.team2.logo}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="match-card__footer">
        <span className="match-card__meta">
          {isLive ? `Mapa ${match.maps_played}/${match.total_maps} · ${match.map}` : isFinished ? match.map : formatDate(match.date)}
        </span>
        <span className="match-card__format">{match.format}</span>
        {(isLive || isUpcoming) && (
          <a href={match.stream_url} className="match-card__watch-btn">
            ▶ Assistir
          </a>
        )}
      </div>
    </div>
  )
}
