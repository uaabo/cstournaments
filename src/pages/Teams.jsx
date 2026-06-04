import { fetchTeams } from '../data/api'
import { transformTeam } from '../data/transform'
import { useApi } from '../hooks/useApi'
import { teams as mockTeams } from '../data/mockData'
import './PageCommon.css'
import './Teams.css'

export default function Teams() {
  const { data: teams, loading, error } = useApi(fetchTeams, transformTeam, 300_000, mockTeams)

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <p className="page-banner-eyebrow">CS2 Esports</p>
          <h1 className="page-banner-title">Equipas</h1>
          <p className="page-banner-meta">{teams.length} equipas profissionais · Top mundial</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {loading && <div className="api-loading">A carregar equipas...</div>}
          {!loading && (
            <div className="teams-grid">
              {teams.map((team, i) => (
                <div key={team.id} className="team-card">
                  <div className="team-card__rank">#{team.ranking}</div>
                  <div className="team-card__logo">
                    {team.logo
                      ? <img src={team.logo} alt={team.name} style={{ width: 52, height: 52, objectFit: 'contain' }} />
                      : <span style={{ fontSize: 44 }}>🎮</span>
                    }
                  </div>
                  <div>
                    <div className="team-card__name">{team.name}</div>
                    <div className="team-card__tag">{team.tag} · {team.country}</div>
                  </div>
                  <div className="team-card__stats">
                    <div className="team-card__stat">
                      <span className="team-card__stat-v">{team.points}</span>
                      <span className="team-card__stat-l">Pts</span>
                    </div>
                  </div>
                  <div className="team-card__winrate">
                    <div className="team-card__winrate-fill"
                      style={{ width: `${Math.max(10, 100 - i * 7)}%`, background: team.color }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
