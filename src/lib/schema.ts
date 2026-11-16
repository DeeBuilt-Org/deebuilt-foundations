// JSON-LD schema for each page's head. Search engines and AI tools read it to
// learn who Ruthnie is, what DeeBuilt offers, and how the pages fit together.
// Every fact here comes from the site's own content; nothing is added that the
// pages don't already say.
import { LINKEDIN_URL, YOUTUBE_URL, positioning } from "@/content/projects";
import { pageUrl } from "@/lib/site";

type JsonLdValue = string | number | boolean | null | JsonLd | JsonLdValue[];
export type JsonLd = { [key: string]: JsonLdValue };

const BUSINESS_NAME = "DeeBuilt";
const businessId = pageUrl("/#business");
const personId = pageUrl("/#person");

// The business works with clients online, so it has no street address;
// areaServed says where clients can be.
const areaServed: JsonLd = { "@type": "Country", name: "United States" };

/**
 * A head() scripts entry that renders the schema as a JSON-LD script tag.
 * TanStack writes the text into the tag as-is, so "<" is escaped: a "</script>"
 * inside any value would otherwise end the tag early. JSON reads < as "<".
 */
export function schemaScript(schema: JsonLd) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(schema).replace(/</g, "\\u003c"),
  };
}

/** Ruthnie, linked to the business she runs. Homepage only. */
export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: positioning.headline,
    alternateName: "Dee",
    jobTitle: positioning.role,
    url: pageUrl("/about"),
    image: pageUrl("/Prof Headshot.png"),
    sameAs: [LINKEDIN_URL],
    worksFor: { "@id": businessId },
  };
}

/** DeeBuilt, linked to Ruthnie as its founder. Homepage only. */
export function businessSchema(description: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": businessId,
    name: BUSINESS_NAME,
    description,
    url: pageUrl("/"),
    logo: pageUrl("/DeeBuilt logo_A14 (1).png"),
    founder: { "@id": personId },
    sameAs: [YOUTUBE_URL],
    areaServed,
  };
}

/** One service, offered by the business. The services page lists each one. */
export function serviceSchema(service: { name: string; description: string }): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: { "@id": businessId },
    areaServed,
  };
}

/** The trail from the homepage to this page. Every page except the homepage carries one. */
export function breadcrumbSchema(crumbs: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: BUSINESS_NAME, path: "/" }, ...crumbs].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: pageUrl(crumb.path),
    })),
  };
}
