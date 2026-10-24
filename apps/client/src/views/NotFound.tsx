import { useAudience } from "@/rebuild/audiences";
import { pageMeta } from "@/rebuild/meta";
import {
  ButtonLink,
  Eyebrow,
  SiteShell,
  useDocumentMeta,
} from "@/rebuild/site";

export default function NotFound() {
  const audience = useAudience();
  useDocumentMeta(pageMeta.notFound);

  return (
    <SiteShell>
      <main id="main-content" className="mx-auto max-w-3xl px-5 pb-32 pt-40 md:px-8 md:pt-48">
        <Eyebrow index="404">Page not found</Eyebrow>
        <h1 className="type-hero mt-6 text-[clamp(2.75rem,6vw,5rem)] text-ink">
          This page has <em className="italic text-cobalt">moved on.</em>
        </h1>
        <p className="type-lede mt-6 max-w-xl text-stone">
          The link may be out of date. The work, references and CV are all one
          click away.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={audience.path} variant="ink">
            Go to the home page
          </ButtonLink>
          <ButtonLink href="/cv" variant="outline">
            Read the CV
          </ButtonLink>
        </div>
      </main>
    </SiteShell>
  );
}
