// =============================================
// src/data/transform.js — CSTournaments
// Transforma dados da PandaScore para o formato do site
// =============================================

// ── Matches ──
export function transformMatch(m) {
  const team1 = m.opponents?.[0]?.opponent;
  const team2 = m.opponents?.[1]?.opponent;

  const isLive    = m.status === "running";
  const isFinished = m.status === "finished";
  const isUpcoming = !isLive && !isFinished;

  // Resultado: games ganhos por cada equipa
  const score1 = isFinished ? (m.results?.[0]?.score ?? null) : (isLive ? m.games?.filter(g => g.winner?.id === team1?.id).length : null);
  const score2 = isFinished ? (m.results?.[1]?.score ?? null) : (isLive ? m.games?.filter(g => g.winner?.id === team2?.id).length : null);

  return {
    id: m.id,
    tournament: m.league?.name || m.tournament?.name || "—",
    tournament_id: m.tournament?.id,
    team1: {
      name: team1?.acronym || team1?.name?.slice(0, 6) || "TBD",
      full: team1?.name || "TBD",
      logo: team1?.image_url || null,
    },
    team2: {
      name: team2?.acronym || team2?.name?.slice(0, 6) || "TBD",
      full: team2?.name || "TBD",
      logo: team2?.image_url || null,
    },
    score1,
    score2,
    date: m.begin_at || m.scheduled_at,
    map: m.games?.[0]?.map?.name || "TBD",
    status: isLive ? "live" : isFinished ? "finished" : "upcoming",
    stream_url: (() => {
      const streams = m.streams_list || [];
      // 1. stream oficial em inglês
      const officialEn = streams.find(s => s.official && s.language === 'en');
      if (officialEn) return officialEn.raw_url;
      // 2. qualquer stream oficial
      const official = streams.find(s => s.official);
      if (official) return official.raw_url;
      // 3. stream em inglês
      const english = streams.find(s => s.language === 'en');
      if (english) return english.raw_url;
      // 4. primeira stream que não seja russa
      const nonRu = streams.find(s => s.language !== 'ru');
      if (nonRu) return nonRu.raw_url;
      // 5. qualquer stream
      return streams[0]?.raw_url || '#';
    })(),
    format: m.match_type === "best_of" ? `BO${m.number_of_games}` : m.match_type || "BO3",
    total_maps: m.number_of_games || 3,
    winner: isFinished ? (m.winner?.name || null) : null,
  };
}

// ── Tournaments ──
export function transformTournament(t) {
  const status = t.live_supported && !t.end_at
    ? "live"
    : t.end_at && new Date(t.end_at) < new Date()
    ? "finished"
    : "upcoming";

  return {
    id: t.id,
    name: t.name,
    organizer: t.league?.name || t.serie?.name || "—",
    prize_pool: t.prizepool ? `$${Number(t.prizepool).toLocaleString()}` : "N/D",
    location: t.country || "Online",
    start_date: t.begin_at || t.expected_roster?.begin_at || new Date().toISOString(),
    end_date: t.end_at || t.expected_roster?.end_at || new Date().toISOString(),
    status,
    tier: t.tier ? t.tier.toUpperCase() : "B",
    teams_count: t.teams_count || t.expected_roster?.length || 0,
    logo: t.league?.image_url || null,
    winner: t.winner?.name || null,
    format: t.format || "—",
  };
}

// ── Teams ──
export function transformTeam(t, index) {
  return {
    id: t.id,
    name: t.name,
    tag: t.acronym || t.name?.slice(0, 4).toUpperCase(),
    country: t.location || "—",
    ranking: index + 1,
    points: Math.max(0, 1000 - index * 30), // estimativa
    wins: 0,
    losses: 0,
    logo: t.image_url || null,
    color: teamColor(index),
  };
}

// Cores para equipas sem cor definida
function teamColor(index) {
  const colors = [
    "#e8002d", "#ff6600", "#f5b800", "#00d084",
    "#1a8cff", "#9c27b0", "#ff1744", "#00bcd4",
    "#ff9800", "#4caf50", "#e91e63", "#2196f3",
  ];
  return colors[index % colors.length];
}
