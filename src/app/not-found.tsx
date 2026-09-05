import { ButtonLink } from "@/components/library/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center bg-ink pt-20 text-bone">
      <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
        <p className="eyebrow text-amber-soft">Page not found</p>
        <h1 className="font-display mt-4 max-w-3xl text-balance text-[2.8rem] font-medium leading-[1.02] sm:text-[4rem]">
          This address does not exist. Yet.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone/80">
          The page you were looking for has moved or was never built. The homes, the neighborhoods and the Journal are all still where you left them.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to the front door</ButtonLink>
          <ButtonLink href="/listings" tone="ghost-dark">Browse homes</ButtonLink>
        </div>
      </div>
    </section>
  );
}
