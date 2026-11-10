import { PageRuntime } from "../../runtime/PageRuntime";
import Page from "../../../../app/morpheus8-los-angeles/page.tsx";
type RouteProps = {
  pathname: string;
  search?: string;
  params?: Record<string, string>;
};

const PageComponent = Page as any;

export default function Morpheus8LosAngeles({
  pathname,
  search = "",
  params
}: RouteProps) {
  const pageProps = {} as any;
  let content = <PageComponent {...pageProps} />;
  return (
    <PageRuntime pathname={pathname} search={search}>
      {content}
    </PageRuntime>
  );
}
