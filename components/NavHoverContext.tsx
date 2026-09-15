"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";

type Ctx = {
  hoveredSection: string | null;
  pinned: boolean;
  openSection: (section: string) => void;
  openImmediate: (section: string) => void;
  pinSection: (section: string) => void;
  closeSection: () => void;
  cancelClose: () => void;
  closeImmediate: () => void;
};

const NavHoverContext = createContext<Ctx>({
  hoveredSection: null,
  pinned: false,
  openSection: () => {},
  openImmediate: () => {},
  pinSection: () => {},
  closeSection: () => {},
  cancelClose: () => {},
  closeImmediate: () => {},
});

export function NavHoverProvider({ children }: { children: ReactNode }) {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [pinned, setPinned] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const openSection = useCallback((section: string) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    openTimer.current = setTimeout(() => {
      setHoveredSection(section);
      openTimer.current = null;
    }, 100);
  }, []);

  const openImmediate = useCallback((section: string) => {
    clearTimers();
    setHoveredSection(section);
  }, [clearTimers]);

  const pinSection = useCallback((section: string) => {
    clearTimers();
    setHoveredSection(section);
    setPinned(true);
  }, [clearTimers]);

  const closeSection = useCallback(() => {
    if (pinned) return;
    if (openTimer.current) { clearTimeout(openTimer.current); openTimer.current = null; }
    if (closeTimer.current) return;
    closeTimer.current = setTimeout(() => {
      setHoveredSection(null);
      closeTimer.current = null;
    }, 200);
  }, [pinned]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  }, []);

  const closeImmediate = useCallback(() => {
    clearTimers();
    setPinned(false);
    setHoveredSection(null);
  }, [clearTimers]);

  return (
    <NavHoverContext.Provider
      value={{ hoveredSection, pinned, openSection, openImmediate, pinSection, closeSection, cancelClose, closeImmediate }}
    >
      {children}
    </NavHoverContext.Provider>
  );
}

export const useNavHover = () => useContext(NavHoverContext);
