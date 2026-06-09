export const ECOSYSTEM_PILLAR_IDS = ["consumer", "providers", "institutions"] as const;

export type EcosystemPillarId = (typeof ECOSYSTEM_PILLAR_IDS)[number];

const PILLAR_ID_SET = new Set<string>(ECOSYSTEM_PILLAR_IDS);

export function isEcosystemPillarId(id: string): id is EcosystemPillarId {
  return PILLAR_ID_SET.has(id);
}

export function getHashFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  return href.slice(hashIndex + 1);
}

export function isHomePagePath(pathname: string) {
  return pathname === "/" || pathname === "";
}
