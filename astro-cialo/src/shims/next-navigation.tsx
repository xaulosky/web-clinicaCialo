import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

interface NavigationContextValue {
  pathname: string;
  search: string;
  push: (href: string) => void;
  replace: (href: string) => void;
  back: () => void;
  refresh: () => void;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

const getBrowserLocation = () => {
  if (typeof window === "undefined") {
    return {
      pathname: "/",
      search: ""
    };
  }

  return {
    pathname: window.location.pathname || "/",
    search: window.location.search || ""
  };
};

const normalizeHref = (href: string) => href;

export function NavigationProvider({
  pathname,
  search = "",
  children
}: {
  pathname: string;
  search?: string;
  children: ReactNode;
}) {
  const [location, setLocation] = useState({
    pathname,
    search
  });

  useEffect(() => {
    setLocation(getBrowserLocation());

    const handlePopState = () => {
      setLocation(getBrowserLocation());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigation = useMemo<NavigationContextValue>(
    () => ({
      pathname: location.pathname || pathname,
      search: location.search || search,
      push: (href) => {
        if (typeof window === "undefined") {
          return;
        }

        window.location.assign(normalizeHref(href));
      },
      replace: (href) => {
        if (typeof window === "undefined") {
          return;
        }

        window.location.replace(normalizeHref(href));
      },
      back: () => {
        if (typeof window === "undefined") {
          return;
        }

        window.history.back();
      },
      refresh: () => {
        if (typeof window === "undefined") {
          return;
        }

        window.location.reload();
      }
    }),
    [location.pathname, location.search, pathname, search]
  );

  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
}

const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (!context) {
    throw new Error("Navigation hooks must be used within NavigationProvider.");
  }

  return context;
};

export function useRouter() {
  const context = useNavigationContext();

  return {
    push: context.push,
    replace: context.replace,
    back: context.back,
    refresh: context.refresh,
    prefetch: async () => {}
  };
}

export function usePathname() {
  return useNavigationContext().pathname;
}

export function useSearchParams() {
  const { search } = useNavigationContext();

  return useMemo(
    () => new URLSearchParams(search.startsWith("?") ? search.slice(1) : search),
    [search]
  );
}

export function notFound(): never {
  throw new Error("NEXT_NOT_FOUND");
}

