import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkHref =
  | string
  | URL
  | {
      pathname?: string;
      query?: Record<string, string | number | boolean | null | undefined>;
      search?: string;
      hash?: string;
    };

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: LinkHref;
  children?: ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string;
}

const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:/;
const hasFileExtension = /\/[^/?#]+\.[^/?#]+$/;

const addTrailingSlashToInternalPath = (href: string) => {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("?") ||
    href.startsWith("//") ||
    hasProtocol.test(href)
  ) {
    return href;
  }

  const [, pathname = "", suffix = ""] = href.match(/^([^?#]*)([?#].*)?$/) ?? [];

  if (
    !pathname.startsWith("/") ||
    pathname === "/" ||
    pathname.endsWith("/") ||
    hasFileExtension.test(pathname)
  ) {
    return href;
  }

  return `${pathname}/${suffix}`;
};

const normalizeHref = (href: LinkHref) => {
  if (typeof href === "string") {
    return addTrailingSlashToInternalPath(href);
  }

  if (href instanceof URL) {
    return href.toString();
  }

  const pathname = href.pathname ?? "";
  const search =
    href.search ??
    (href.query
      ? `?${new URLSearchParams(
          Object.entries(href.query).flatMap(([key, value]) =>
            value === null || value === undefined ? [] : [[key, String(value)]]
          )
        ).toString()}`
      : "");

  return addTrailingSlashToInternalPath(`${pathname}${search}${href.hash ?? ""}`);
};

export default function Link({
  href,
  children,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  ...rest
}: LinkProps) {
  return (
    <a href={normalizeHref(href)} {...rest}>
      {children}
    </a>
  );
}
