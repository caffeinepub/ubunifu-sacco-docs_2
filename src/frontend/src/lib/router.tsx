/**
 * Minimal client-side router using browser History API.
 * Provides: useRoute, navigate, Link, NavLink
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const RouterContext = createContext<{
  pathname: string;
  navigate: (to: string) => void;
}>({
  pathname: "/",
  navigate: () => {},
});

export function Router({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState(() => window.location.pathname);

  useEffect(() => {
    const handler = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = useCallback((to: string) => {
    window.history.pushState(null, "", to);
    setPathname(to);
  }, []);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export function Link({ to, children, onClick, ...props }: LinkProps) {
  const { navigate } = useRouter();
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

interface NavLinkProps extends Omit<LinkProps, "style" | "className"> {
  end?: boolean;
  style?:
    | ((args: { isActive: boolean }) => React.CSSProperties)
    | React.CSSProperties;
  className?: ((args: { isActive: boolean }) => string) | string;
}

export function NavLink({
  to,
  children,
  end,
  style,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...props
}: NavLinkProps) {
  const { pathname, navigate } = useRouter();
  const isActive = end
    ? pathname === to
    : pathname.startsWith(to) &&
      (pathname === to || pathname[to.length] === "/");
  const resolvedStyle =
    typeof style === "function" ? style({ isActive }) : style;
  const resolvedClass =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <a
      href={to}
      aria-current={isActive ? "page" : undefined}
      style={resolvedStyle}
      className={resolvedClass}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick?.(e);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {children}
    </a>
  );
}

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  exact?: boolean;
}

export function Routes({ routes }: { routes: RouteConfig[] }) {
  const { pathname } = useRouter();
  const match = routes.find((r) =>
    r.exact !== false ? pathname === r.path : pathname.startsWith(r.path),
  );
  return <>{match?.element ?? null}</>;
}
