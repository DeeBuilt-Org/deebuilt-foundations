import { Link } from "@tanstack/react-router";

/**
 * The 404 page's content. Two places render it: the root route's
 * notFoundComponent (an unknown address reached by an in-app link) and the
 * /404 route, which the build prerenders to 404.html. Cloudflare serves that
 * file with a 404 status for any address that has no page (wrangler.jsonc).
 */
export function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 md:px-10">
      <span className="eyebrow">404</span>
      <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">Page not found</h1>
      <p className="mt-4 text-muted">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
