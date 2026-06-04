// =============================================
// src/hooks/useApi.js
// Hook genérico para chamadas à API com loading/error/refresh
// =============================================
import { useState, useEffect, useRef, useCallback } from "react";
import { matches as mockMatches, tournaments as mockTournaments, teams as mockTeams } from "../data/mockData";

// Usa dados mockados se o Worker ainda não estiver configurado
const WORKER_CONFIGURED = !import.meta.env.VITE_WORKER_URL?.includes("SEU_SUBDOMAIN");

export function useApi(fetchFn, transform, refreshInterval = 0, fallback = []) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const intervalRef           = useRef(null);

  const load = useCallback(async () => {
    try {
      setError(null);
      const raw = await fetchFn();
      const transformed = Array.isArray(raw) ? raw.map((item, i) => transform(item, i)) : transform(raw, 0);
      setData(transformed);
    } catch (err) {
      console.warn("API error, usando fallback:", err.message);
      setError(err.message);
      if (!data) setData(fallback); // só usa fallback na primeira falha
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    load();
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(load, refreshInterval);
    }
    return () => clearInterval(intervalRef.current);
  }, [load, refreshInterval]);

  return { data: data ?? fallback, loading, error, refresh: load };
}
