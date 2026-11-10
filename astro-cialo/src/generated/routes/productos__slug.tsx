import { use } from "react";
import { PageRuntime } from "../../runtime/PageRuntime";
import Page from "../../../../app/productos/[slug]/page.tsx";
type RouteProps = {
  pathname: string;
  search?: string;
  params?: Record<string, string>;
};

const PageComponent = Page as any;

export default function ProductosSlug({
  pathname,
  search = "",
  params
}: RouteProps) {
  const pageProps = { params } as any;
  let content = use(PageComponent(pageProps));
  return (
    <PageRuntime pathname={pathname} search={search}>
      {content}
    </PageRuntime>
  );
}
