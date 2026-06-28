// Rate-limit simple en memoria (por instancia). Suficiente como primera barrera
// anti-abuso; en multi-instancia conviene un store externo (Redis/Upstash).
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (arr.length >= max) {
    hits.set(key, arr);
    return false; // bloqueado
  }
  arr.push(now);
  hits.set(key, arr);
  return true; // permitido
}
