import { createContext } from "react";

interface ExplorerContextType {
  activeNodeId: string;
  setActiveNodeId(id: string): void;
  clearActiveNode(): void;
}

export const ExplorerContext = createContext<ExplorerContextType | null>(null);
