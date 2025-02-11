"use client";
import { useState, type ReactNode } from "react";
import { ExplorerContext } from "./ExplorerContext";

interface ExplorerContextProviderProps {
  children?: ReactNode;
}

export function ExplorerContextProvider({
  children,
}: ExplorerContextProviderProps) {
  const [activeNodeId, setActiveNodeId] = useState("");

  function clearActiveNode() {
    setActiveNodeId("");
  }

  return (
    <ExplorerContext.Provider
      value={{
        activeNodeId,
        setActiveNodeId,
        clearActiveNode,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
}
