import { PageRuntime } from "../../runtime/PageRuntime";
import Page from "../../../../app/profesionales/page.tsx";
import Layout0 from "../../../../app/profesionales/layout.tsx";
type RouteProps = {
  pathname: string;
  search?: string;
  params?: Record<string, string>;
};

const PageComponent = Page as any;

export default function Profesionales({
  pathname,
  search = "",
  params
}: RouteProps) {
  const pageProps = {} as any;
  let content = <PageComponent {...pageProps} />;
  content = <Layout0>{content}</Layout0>;
  return (
    <PageRuntime pathname={pathname} search={search}>
      {content}
    </PageRuntime>
  );
}
