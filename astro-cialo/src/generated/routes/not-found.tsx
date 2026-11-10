import { PageRuntime } from "../../runtime/PageRuntime";
import NotFoundPage from "../../../../app/not-found";

const NotFoundComponent = NotFoundPage as any;

export default function NotFoundRoute({
  pathname,
  search = ""
}: {
  pathname: string;
  search?: string;
}) {
  return (
    <PageRuntime pathname={pathname} search={search}>
      <NotFoundComponent />
    </PageRuntime>
  );
}

