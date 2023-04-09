// A implementer
export function jaccardDistance(set1: Set<string>, set2: Set<string>): number {
  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  const intersectionSize = intersection.size;
  const unionSize = union.size;
  if (intersectionSize > unionSize) {
    return 0;
  }
  return 1 - intersectionSize / unionSize;
}
