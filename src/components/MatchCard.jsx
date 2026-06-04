import './MatchCard.css'

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-PT', { weekday: 'short', day: '2-digit', month: 'short' })
}

function formatTime(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
}

function TeamBlock({ team, winner, side }) {
  const isWinner = winner === team.name
  const isLoser = winner && winner !== team.name
  return (
    <div className={`match-card__team match-card__team--${side} ${isWinner ? 'match-card__team--winner' : ''} ${isLoser ? 'match-card__team--loser' : ''}`}>
      {team.logo
        ? <img className="match-card__team-logo" src={team.logo} alt={team.name} />
        : <span className="match-card__team-logo match-card__team-logo--placeholder">{team.name.slice(0, 2)}</span>}
      <span className="match-card__team-name">{team.name}</span>
    </div>
  )
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
        <TeamBlock team={match.team1} winner={winner} side="left" />

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

        <TeamBlock team={match.team2} winner={winner} side="right" />
      </div>

      {/* Footer */}
      <div className="match-card__footer">
        <span className="match-card__meta">
          {isLive ? `Mapa ${match.score1 + match.score2 + 1}/${match.total_maps}` : isFinished ? match.map : formatDate(match.date)}
        </span>
        <span className="match-card__format">{match.format}</span>
        {(isLive || isUpcoming) && (
          <a href={match.stream_url} className="match-card__watch-btn" target="_blank" rel="noopener noreferrer">
            ▶ Assistir
          </a>
        )}
      </div>
    </div>
  )
}
