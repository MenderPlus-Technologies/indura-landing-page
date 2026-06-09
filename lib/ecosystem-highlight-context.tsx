"use client";

import {
  isEcosystemPillarId,
  type EcosystemPillarId,
} from "@/lib/ecosystem-navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type EcosystemHighlightContextValue = {
  activePillarId: EcosystemPillarId | null;
  poppingPillarId: EcosystemPillarId | null;
  navigateToPillar: (id: EcosystemPillarId) => void;
};

const EcosystemHighlightContext =
  createContext<EcosystemHighlightContextValue | null>(null);

export function EcosystemHighlightProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activePillarId, setActivePillarId] =
    useState<EcosystemPillarId | null>(null);
  const [poppingPillarId, setPoppingPillarId] =
    useState<EcosystemPillarId | null>(null);

  const highlightPillar = useCallback((id: EcosystemPillarId) => {
    setActivePillarId(id);
    setPoppingPillarId(id);
    window.setTimeout(() => {
      setPoppingPillarId(null);
    }, 700);
  }, []);

  const navigateToPillar = useCallback(
    (id: EcosystemPillarId) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }

      el.scrollIntoView({ behavior: "smooth", block: "center" });

      window.setTimeout(() => {
        highlightPillar(id);
      }, 550);
    },
    [highlightPillar]
  );

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!isEcosystemPillarId(hash)) return;

      window.setTimeout(() => {
        navigateToPillar(hash);
      }, 150);
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, [navigateToPillar]);

  const value = useMemo(
    () => ({ activePillarId, poppingPillarId, navigateToPillar }),
    [activePillarId, poppingPillarId, navigateToPillar]
  );

  return (
    <EcosystemHighlightContext.Provider value={value}>
      {children}
    </EcosystemHighlightContext.Provider>
  );
}

export function useEcosystemHighlight() {
  return useContext(EcosystemHighlightContext);
}
