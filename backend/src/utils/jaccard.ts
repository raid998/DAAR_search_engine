// A implementer
export const jaccardDistance = (setA: string[], setB: string[]): number => {
  const intersection = setA.filter((x) => setB.includes(x));
  const union = [...new Set([...setA, ...setB])];
  return 1 - intersection.length / union.length;
};
