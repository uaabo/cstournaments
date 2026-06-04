import './PageCommon.css'
import './Rankings.css'

// Rankings desativados temporariamente.
// Para reativar:
// 1. Adiciona a rota "/api/rankings" ao worker (já existe)
// 2. Importa: import { fetchTeams } from '../data/api'
// 3. Importa: import { transformTeam } from '../data/transform'
// 4. Importa: import { useApi } from '../hooks/useApi'
// 5. Substitui "const teams = []" por:
//    const { data: teams } = useApi(fetchTeams, transformTeam, 300_000, [])
// 6. Remove o bloco "coming soon" e descomenta a tabela abaixo

export default function Rankings() {
  const teams = [] // substituir para ativar — ver comentário acima

  return (
    <div>
      <div className="page-banner">
        <div className="container">
          <p className="page-banner-eyebrow">CS2 Esports</p>
          <h1 className="page-banner-title">Rankings</h1>
          <p className="page-banner-meta">Ranking mundial</p>
        </div>
      </div>

      <section className="section">
        <div className="container" style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', marginBottom: '8px' }}>Em breve</h2>
          <p>Os rankings mundiais estão a ser preparados.</p>
        </div>
      </section>
    </div>
  )
}