import { use } from "react";
import { PageRuntime } from "../../runtime/PageRuntime";
import Page from "../../../../app/tratamientos/categoria/[slug]/page.tsx";
type RouteProps = {
  pathname: string;
  search?: string;
  params?: Record<string, string>;
};

const PageComponent = Page as any;

export default function TratamientosCategoriaSlug({
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
