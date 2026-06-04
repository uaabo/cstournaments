import { rankings } from '../data/mockData'
import './PageCommon.css'
import './Rankings.css'

const medalColors = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' }

export default function Rankings() {
  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <p className="page-banner-eyebrow">CS2 Esports</p>
          <h1 className="page-banner-title">Rankings</h1>
          <p className="page-banner-meta">Ranking mundial · Junho 2025</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="rankings-table">
            <div className="rankings-header">
              <span className="rk-col rk-col--pos">Pos</span>
              <span className="rk-col rk-col--team">Equipa</span>
              <span className="rk-col rk-col--num">V</span>
              <span className="rk-col rk-col--num">D</span>
              <span className="rk-col rk-col--num">Win %</span>
              <span className="rk-col rk-col--points">Pontos</span>
            </div>

            {rankings.map((team, idx) => {
              const winRate = Math.round((team.wins / (team.wins + team.losses)) * 100)
              const maxPoints = rankings[0].points
              const isTop3 = team.ranking <= 3

              return (
                <div key={team.id} className={`rankings-row ${isTop3 ? 'rankings-row--top3' : ''}`} style={{ animationDelay: `${idx * 0.04}s` }}>
                  <span className="rk-col rk-col--pos">
                    {isTop3
                      ? <span className="rank-medal" style={{ color: medalColors[team.ranking] }}>{team.ranking === 1 ? '🥇' : team.ranking === 2 ? '🥈' : '🥉'}</span>
                      : <span className="rank-num">{team.ranking}</span>
                    }
                  </span>
                  <div className="rk-col rk-col--team rankings-team">
                    <span className="rankings-team-logo">{team.logo}</span>
                    <div className="rankings-team-info">
                      <span className="rankings-team-name">{team.name}</span>
                      <span className="rankings-team-tag">{team.tag} · {team.country}</span>
                    </div>
                  </div>
                  <span className="rk-col rk-col--num rankings-wins">{team.wins}</span>
                  <span className="rk-col rk-col--num rankings-losses">{team.losses}</span>
                  <span className="rk-col rk-col--num" style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{winRate}%</span>
                  <div className="rk-col rk-col--points rankings-points-col">
                    <span className="rankings-points-value">{team.points}</span>
                    <div className="rankings-points-bar">
                      <div className="rankings-points-fill" style={{ width: `${(team.points / maxPoints) * 100}%`, background: team.color }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="rankings-legend">* Dados mockados para fins de demonstração.</p>
        </div>
      </section>
    </div>
  )
}
