import { useState, useEffect, useCallback } from "react";
import { ActiveTab } from "../types";

const getTabFromPathname = (pathname: string): ActiveTab => {
  if (pathname === "/aboutus.html") return "about";
  if (pathname === "/products.html") return "services";
  if (pathname === "/contactus.html") return "contact";
  if (pathname === "/admin.html" || pathname === "/admin") return "admin";
  return "home";
};

const getPathnameFromTab = (tab: ActiveTab): string => {
  switch (tab) {
    case "about":
      return "/aboutus.html";
    case "services":
      return "/products.html";
    case "contact":
      return "/contactus.html";
    case "admin":
      return "/admin.html";
    case "home":
    default:
      return "/index.html";
  }
};

export function useNavigation() {
  const [activeTab, setActiveTabState] = useState<ActiveTab>(() => {
    return getTabFromPathname(window.location.pathname);
  });

  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getTabFromPathname(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setActiveTab = useCallback((tab: ActiveTab) => {
    setActiveTabState(tab);
    const path = getPathnameFromTab(tab);
    window.history.pushState(null, "", path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { activeTab, setActiveTab };
}
