import { PageRuntime } from "../../runtime/PageRuntime";
import Page from "../../../../app/admin/comisiones/page.tsx";
import Layout0 from "../../../../app/admin/layout.tsx";
type RouteProps = {
  pathname: string;
  search?: string;
  params?: Record<string, string>;
};

const PageComponent = Page as any;

export default function AdminComisiones({
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
