const importStatementPattern =
  /(?:import|export[^'"`]+from)[^'"`]+['"`]((?:\.{1,2}\/|@\/)[^'"`]*)['"`]/g;

export function findRelativeImportPaths(contents: string) {
  return Array.from(
    contents.matchAll(importStatementPattern).map((match) => match[1])
  );
}
