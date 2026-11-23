import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { PdfViewer } from "@/components/resources/PdfViewer";
import { downloadBySlug, downloadPath, type DownloadResource } from "@/content/resources";
import { breadcrumbSchema, schemaScript } from "@/lib/schema";
import { canonicalLink, pageUrl } from "@/lib/site";

/**
 * A PDF's own page: /resources/<slug>. Added 2026-11-23.
 *
 * Why it exists: a link straight to a PDF shows a blank card on Facebook and
 * LinkedIn, because a PDF has no title, description, or image for them to
 * read. This page carries those tags and shows the PDF in the browser, so the
 * link is worth sharing. Every PDF in src/content/resources.ts gets one; the
 * prerender finds it through the Resources page's link and adds it to the
 * sitemap.
 *
 * `resources_` (trailing underscore) keeps this page out of the Resources
 * page's layout: it is its own page, not a section inside that one.
 */
export const Route = createFileRoute("/resources_/$slug")({
  loader: ({ params }) => {
    const file = downloadBySlug(params.slug);
    if (!file) throw notFound();
    return file;
  },
  head: ({ loaderData }) => (loaderData ? pdfHead(loaderData) : {}),
  component: PdfPage,
});

function pdfHead(file: DownloadResource) {
  const path = downloadPath(file);
  const title = `${file.title} — DeeBuilt`;
  const description = `${file.description} A free ${file.fileType}, ${file.length}.`;
  const image = file.shareImage
    ? [
        { property: "og:image", content: pageUrl(file.shareImage) },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: file.title },
        // The site-wide default is the small "summary" card; this page has a
        // wide image made for the large one.
        { name: "twitter:card", content: "summary_large_image" },
      ]
    : [];

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: pageUrl(path) },
      ...image,
    ],
    links: [canonicalLink(path)],
    scripts: [
      schemaScript(
        breadcrumbSchema([
          { name: "Resources", path: "/resources" },
          { name: file.title, path },
        ]),
      ),
    ],
  };
}

function PdfPage() {
  const file = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-10 pb-16 md:px-10 md:pt-16 md:pb-24">
      <FadeUp>
        <Link to="/resources" className="text-sm text-muted transition-colors hover:text-accent">
          ← Free resources
        </Link>
        <h1 className="display-lg mt-6 max-w-3xl">{file.title}</h1>
        <p className="lede mt-4 max-w-2xl text-muted">{file.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="text-sm text-muted">
            {file.fileType}, {file.length}
          </p>
          {/* Phones get their own open and save buttons in the viewer below. */}
          <a href={file.file} download className="btn-primary hidden md:inline-flex">
            Download the PDF
          </a>
        </div>
      </FadeUp>

      <FadeUp delay={80}>
        <PdfViewer
          file={file}
          heading={false}
          className="mt-10 overflow-hidden rounded-lg border border-hairline bg-surface md:mt-12 md:h-[85svh]"
        />
      </FadeUp>
    </section>
  );
}
