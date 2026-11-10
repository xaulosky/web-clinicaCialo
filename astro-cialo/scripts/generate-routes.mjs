import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(projectDir, "..");
const appDir = path.join(repoRoot, "app");
const pagesDir = path.join(projectDir, "src", "pages");
const generatedRoutesDir = path.join(projectDir, "src", "generated", "routes");
const manifestPath = path.join(projectDir, "src", "generated", "route-manifest.json");
const preservedPageFiles = new Set(["404.astro"]);

const toPosix = (value) => value.split(path.sep).join("/");

const routeIdFromSegments = (segments) =>
  segments.length === 0
    ? "root"
    : segments
        .map((segment) =>
          segment
            .replace(/^\[(.+)\]$/, "$1")
            .replace(/[^a-zA-Z0-9]+/g, "_")
            .replace(/^_+|_+$/g, "")
            .toLowerCase() || "segment"
        )
        .join("__");

const routePathFromSegments = (segments) =>
  segments.length === 0 ? "/" : `/${segments.join("/")}`;

const astroPageFileFromSegments = (segments) => {
  if (segments.length === 0) {
    return path.join(pagesDir, "index.astro");
  }

  const directory = path.join(pagesDir, ...segments.slice(0, -1));
  const fileName = `${segments.at(-1)}.astro`;
  return path.join(directory, fileName);
};

const relativeImport = (fromFile, toFile) => {
  const relativePath = path.relative(path.dirname(fromFile), toFile);
  const posixPath = toPosix(relativePath);
  return posixPath.startsWith(".") ? posixPath : `./${posixPath}`;
};

async function ensureDirectory(targetPath) {
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
}

async function listPageFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === "components") {
      continue;
    }

    const resolved = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listPageFiles(resolved)));
      continue;
    }

    if (entry.isFile() && entry.name === "page.tsx") {
      files.push(resolved);
    }
  }

  return files;
}

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function readLayoutChain(pageFile) {
  const directories = [];
  let cursor = path.dirname(pageFile);

  while (cursor.startsWith(appDir) && cursor !== appDir) {
    directories.unshift(cursor);
    cursor = path.dirname(cursor);
  }

  const layouts = [];

  for (const directory of directories) {
    const layoutFile = path.join(directory, "layout.tsx");
    if (await fileExists(layoutFile)) {
      layouts.push(layoutFile);
    }
  }

  return layouts;
}

function buildWrapperSource({
  routeId,
  wrapperFile,
  pageFile,
  layoutFiles,
  isAsyncPage,
  isDynamicRoute
}) {
  const pageImportPath = relativeImport(wrapperFile, pageFile);
  const layoutImports = layoutFiles
    .map((layoutFile, index) => {
      const importPath = relativeImport(wrapperFile, layoutFile);
      return `import Layout${index} from "${importPath}";`;
    })
    .join("\n");

  const layoutWraps = layoutFiles
    .map((_, index) => `  content = <Layout${index}>{content}</Layout${index}>;`)
    .join("\n");

  const asyncHelpers = isAsyncPage
    ? `import { use } from "react";\n`
    : "";

  const pageRender = isAsyncPage
    ? "  let content = use(PageComponent(pageProps));"
    : "  let content = <PageComponent {...pageProps} />;";

  const pagePropsLine = isDynamicRoute
    ? "  const pageProps = { params } as any;"
    : "  const pageProps = {} as any;";

  return `${asyncHelpers}import { PageRuntime } from "../../runtime/PageRuntime";
import Page from "${pageImportPath}";
${layoutImports ? `${layoutImports}\n` : ""}type RouteProps = {
  pathname: string;
  search?: string;
  params?: Record<string, string>;
};

const PageComponent = Page as any;

export default function ${toComponentName(routeId)}({
  pathname,
  search = "",
  params
}: RouteProps) {
${pagePropsLine}
${pageRender}
${layoutWraps ? `${layoutWraps}\n` : ""}  return (
    <PageRuntime pathname={pathname} search={search}>
      {content}
    </PageRuntime>
  );
}
`;
}

function toComponentName(routeId) {
  return routeId
    .split("__")
    .flatMap((part) => part.split("_"))
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("") || "Root";
}

function buildAstroSource({
  astroFile,
  wrapperFile,
  pageFile,
  layoutFiles,
  isDynamicRoute,
  routePath
}) {
  const baseLayoutImport = relativeImport(
    astroFile,
    path.join(projectDir, "src", "layouts", "BaseLayout.astro")
  );
  const wrapperImport = relativeImport(astroFile, wrapperFile);
  const pageModuleImport = relativeImport(astroFile, pageFile);
  const metadataImports = layoutFiles
    .map((layoutFile) => `"${relativeImport(astroFile, layoutFile)}"`)
    .map((importPath, index) => `import * as LayoutModule${index} from ${importPath};`)
    .join("\n");

  const metadataFallbackChain = [
    "PageModule.metadata",
    ...layoutFiles.map((_, index) => `LayoutModule${index}.metadata`)
  ].join(" ?? ");

  const getStaticPathsBlock = isDynamicRoute
    ? `
export async function getStaticPaths() {
  const paramsList = PageModule.generateStaticParams
    ? await PageModule.generateStaticParams()
    : [];

  return paramsList.map((params) => ({
    params
  }));
}
`
    : "";
  return `---
// @generated by scripts/generate-routes.mjs
import BaseLayout from "${baseLayoutImport}";
import RouteComponent from "${wrapperImport}";
import * as PageModule from "${pageModuleImport}";
${metadataImports}
${getStaticPathsBlock}const params = Astro.params as Record<string, string>;
const metadata = PageModule.generateMetadata
  ? await PageModule.generateMetadata({ params } as any)
  : ${metadataFallbackChain} ?? {};
---

<BaseLayout metadata={metadata} pathname={Astro.url.pathname}>
  <RouteComponent
    client:load
    pathname={Astro.url.pathname}
    search={Astro.url.search}
    params={params}
  />
</BaseLayout>
`;
}

async function removeGeneratedPages(directory) {
  if (!(await fileExists(directory))) {
    return;
  }

  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const resolved = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await removeGeneratedPages(resolved);
      const remaining = await fs.readdir(resolved);
      if (remaining.length === 0) {
        await fs.rmdir(resolved);
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".astro") && entry.name !== "404.astro") {
      const relativePath = toPosix(path.relative(pagesDir, resolved));
      if (!preservedPageFiles.has(relativePath)) {
        await fs.unlink(resolved);
      }
    }
  }
}

async function removeGeneratedRouteComponents(directory) {
  if (!(await fileExists(directory))) {
    return;
  }

  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const resolved = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await removeGeneratedRouteComponents(resolved);
      const remaining = await fs.readdir(resolved);
      if (remaining.length === 0) {
        await fs.rmdir(resolved);
      }
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".tsx") && entry.name !== "not-found.tsx") {
      await fs.unlink(resolved);
    }
  }
}

async function main() {
  const pageFiles = await listPageFiles(appDir);
  const manifest = [];

  await removeGeneratedPages(pagesDir);
  await removeGeneratedRouteComponents(generatedRoutesDir);

  for (const pageFile of pageFiles.sort()) {
    const relativePagePath = path.relative(appDir, pageFile);
    const routeSegments = relativePagePath.split(path.sep).slice(0, -1);
    const routeId = routeIdFromSegments(routeSegments);
    const routePath = routePathFromSegments(routeSegments);
    const astroFile = astroPageFileFromSegments(routeSegments);
    const wrapperFile = path.join(generatedRoutesDir, `${routeId}.tsx`);
    const relativeAstroFile = toPosix(path.relative(pagesDir, astroFile));
    const source = await fs.readFile(pageFile, "utf8");
    const isAsyncPage = /export\s+default\s+async\s+function/.test(source);
    const isDynamicRoute = routeSegments.some((segment) => /^\[.+\]$/.test(segment));
    const layoutFiles = await readLayoutChain(pageFile);

    if (!preservedPageFiles.has(relativeAstroFile)) {
      await ensureDirectory(astroFile);
      await ensureDirectory(wrapperFile);

      await fs.writeFile(
        wrapperFile,
        buildWrapperSource({
          routeId,
          wrapperFile,
          pageFile,
          layoutFiles,
          isAsyncPage,
          isDynamicRoute
        }),
        "utf8"
      );

      await fs.writeFile(
        astroFile,
        buildAstroSource({
          astroFile,
          wrapperFile,
          pageFile,
          layoutFiles,
          isDynamicRoute,
          routePath
        }),
        "utf8"
      );
    }

    manifest.push({
      route: routePath,
      dynamic: isDynamicRoute
    });
  }

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
