import type { Directory } from "@/model/directory";
import type { Document } from "@/model/document";

export function alphabetizeNodes<T extends Directory[] | Document[]>(nodes: T) {
  return nodes.toSorted((a, b) =>
    a.name.localeCompare(b.name)
  ) as T extends Directory[] ? Directory[] : Document[];
}
