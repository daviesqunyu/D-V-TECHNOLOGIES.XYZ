import { DV_KNOWLEDGE, type KnowledgeEntry } from "@/data/dvKnowledge";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s&]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function scoreEntry(tokens: string[], entry: KnowledgeEntry): number {
  if (entry.keywords[0] === "__fallback__") return 0;
  let score = 0;
  for (const token of tokens) {
    for (const kw of entry.keywords) {
      if (kw === token) {
        score += 3; // exact match
      } else if (kw.includes(token) || token.includes(kw)) {
        score += 1; // partial match
      }
    }
  }
  return score;
}

function getFallback(): KnowledgeEntry {
  return DV_KNOWLEDGE.find((e) => e.keywords[0] === "__fallback__")!;
}

export function localAIRespond(userMessage: string): {
  response: string;
  followUps: string[];
} {
  const tokens = tokenize(userMessage);

  if (tokens.length === 0) {
    const fb = getFallback();
    return { response: fb.response, followUps: fb.followUps ?? [] };
  }

  // Score every entry
  const scored = DV_KNOWLEDGE.filter((e) => e.keywords[0] !== "__fallback__").map(
    (entry) => ({ entry, score: scoreEntry(tokens, entry) })
  );

  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];

  // Minimum threshold — if no good match, use fallback
  if (best.score < 1) {
    const fb = getFallback();
    return { response: fb.response, followUps: fb.followUps ?? [] };
  }

  // If two entries tie (within 1 point) and cover different topics, merge top two
  const runner = scored[1];
  if (
    runner &&
    runner.score >= best.score - 1 &&
    runner.score >= 2 &&
    best.entry !== runner.entry
  ) {
    const combined =
      best.entry.response +
      "\n\n---\n\n" +
      "**Also relevant:**\n\n" +
      runner.entry.response;
    const allFollowUps = [
      ...(best.entry.followUps ?? []),
      ...(runner.entry.followUps ?? []),
    ].slice(0, 3);
    return { response: combined, followUps: allFollowUps };
  }

  return {
    response: best.entry.response,
    followUps: best.entry.followUps ?? [],
  };
}
