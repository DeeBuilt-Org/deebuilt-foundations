import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { FadeUp } from "@/components/FadeUp";
import {
  CONTACT_EMAIL,
  FORMSPREE_ENDPOINT,
  YOUTUBE_URL,
} from "@/content/projects";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — DeeBuilt" },
      {
        name: "description",
        content:
          "Get in touch with Ruthnie Benoit about operations, automations, and workflow design.",
      },
      { property: "og:title", content: "Contact — DeeBuilt" },
      {
        property: "og:description",
        content: "Reach out about operations and workflow projects.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

type Status = "idle" | "submitting" | "success" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-28">
      <FadeUp>
        <span className="eyebrow">Contact</span>
      </FadeUp>

      <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <FadeUp>
            <h1 className="display-lg">Let's talk.</h1>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              Share a bit about your business and what you're trying to improve.
              Replies usually come within a couple of business days.
            </p>
          </FadeUp>

          <FadeUp delay={160}>
            <div className="mt-10 space-y-3 text-sm">
              <div>
                <span className="eyebrow">Email</span>
                <div className="mt-1">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="border-b border-foreground pb-0.5 transition-colors hover:border-accent hover:text-accent"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <span className="eyebrow">Elsewhere</span>
                <div className="mt-1">
                  <a
                    href={YOUTUBE_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="border-b border-foreground pb-0.5 transition-colors hover:border-accent hover:text-accent"
                  >
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>

        <div className="md:col-span-7">
          <FadeUp>
            <form onSubmit={onSubmit} className="space-y-8">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field
                label="Message"
                name="message"
                required
                textarea
              />

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                </button>
                {status === "success" && (
                  <p className="text-sm text-accent">
                    Message sent. Talk soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-foreground">
                    Something went wrong. Email {CONTACT_EMAIL} directly.
                  </p>
                )}
              </div>
            </form>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const base =
    "block w-full border-0 border-b border-hairline bg-transparent px-0 py-3 text-base text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-0";
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={`${base} mt-2 resize-none`} />
      ) : (
        <input name={name} type={type} required={required} className={`${base} mt-2`} />
      )}
    </label>
  );
}
