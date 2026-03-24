"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Link from "next/link";

type TransitionContextType = {
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  startTransition: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, [pathname]);

  const startTransition = useCallback(
    (href: string) => {
      if (href === pathname) return;
      setIsVisible(false);
      setPendingHref(href);
    },
    [pathname]
  );

  useEffect(() => {
    if (!isVisible && pendingHref) {
      const timer = setTimeout(() => {
        router.push(pendingHref);
        setPendingHref(null);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isVisible, pendingHref, router]);

  return (
    <TransitionContext.Provider value={{ startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const { startTransition } = usePageTransition();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [pathname]);

  return (
    <div
      className="page-transition"
      style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.25s ease-out" }}
    >
      {children}
    </div>
  );
}

// Custom Link component that triggers page transition
export function TransitionLink({
  href,
  children,
  className,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { startTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(href);
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
