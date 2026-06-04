// =============================================
// src/data/api.js — CSTournaments
// Camada de dados: chama o Cloudflare Worker
// =============================================

// URL do teu Worker — muda após deploy
const WORKER_URL = "cstournaments-api.uaboking.workers.dev";

// Timeout para pedidos (ms)
const TIMEOUT = 8000;

// Fetch com timeout
async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// ── Matches ──
export async function fetchLiveMatches() {
  return fetchWithTimeout(`${WORKER_URL}/api/matches/live`);
}

export async function fetchUpcomingMatches() {
  return fetchWithTimeout(`${WORKER_URL}/api/matches/upcoming`);
}

export async function fetchRecentMatches() {
  return fetchWithTimeout(`${WORKER_URL}/api/matches/results`);
}

// ── Tournaments ──
export async function fetchLiveTournaments() {
  return fetchWithTimeout(`${WORKER_URL}/api/tournaments/live`);
}

export async function fetchUpcomingTournaments() {
  return fetchWithTimeout(`${WORKER_URL}/api/tournaments/upcoming`);
}

export async function fetchPastTournaments() {
  return fetchWithTimeout(`${WORKER_URL}/api/tournaments/past`);
}

// ── Teams & Rankings ──
export async function fetchTeams() {
  return fetchWithTimeout(`${WORKER_URL}/api/teams`);
}
