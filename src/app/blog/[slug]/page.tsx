import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostToc, type TocItem } from "@/components/site/post-toc";
import { ShareBar } from "@/components/site/share-bar";
import { PostBody } from "@/components/site/post-body";
import { AgentCard } from "@/components/site/agent-card";
import { getPost, posts, formatDate } from "@/data/posts";
import { getAgent } from "@/data/agents";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    openGraph: { type: "article", images: [{ url: p.image }], publishedTime: p.date },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const author = getAgent(post.authorSlug)!;
  const toc: TocItem[] = post.blocks
    .filter((b): b is Extract<typeof b, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3")
    .map((b) => ({ id: b.id, text: b.text, level: b.type === "h2" ? 2 : 3 }));
  const url = `${site.url}/blog/${post.slug}`;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article>
      {/* Cabecera */}
      <header className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink text-bone">
        <Image src={post.image} alt={post.alt} fill priority sizes="100vw" className="object-cover opacity-50" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="relative mx-auto w-full max-w-[100rem] px-5 pb-14 pt-40 sm:px-8 sm:pb-20">
          <nav aria-label="Breadcrumb" className="text-[0.9rem] text-bone/70">
            <ol className="flex flex-wrap gap-2">
              <li><Link href="/blog" className="hover:text-bone">The Journal</Link></li>
              <li aria-hidden>/</li>
              <li><span className="italic text-amber-soft">{post.category}</span></li>
            </ol>
          </nav>
          <h1 className="font-display mt-6 max-w-4xl text-balance text-[2.4rem] font-medium leading-[1.04] tracking-[-0.015em] sm:text-[3.4rem] lg:text-[4.4rem]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone/85 sm:text-xl">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-4">
            <span className="relative size-12 overflow-hidden rounded-full bg-ink-2">
              <Image src={author.image} alt="" fill sizes="3rem" className="object-cover" />
            </span>
            <p className="text-[0.95rem] leading-tight">
              <span className="block font-semibold">{author.name}</span>
              <span className="text-bone/70">
                {formatDate(post.date)}, {post.readingTime}
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Dos columnas: índice sticky + share a la izquierda, cuerpo a la derecha */}
      <div className="bg-paper py-12 sm:py-20">
        <div className="mx-auto grid w-full max-w-[100rem] gap-12 px-5 sm:px-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-20 xl:grid-cols-[19rem_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <PostToc items={toc} />
            <div className="mt-8 border-t border-ink/10 pt-6">
              <ShareBar url={url} title={post.title} />
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl">
            <PostBody blocks={post.blocks} />

            <div className="mt-16 rounded-2xl border border-ink/10 bg-bone p-6 sm:p-8">
              <p className="eyebrow text-amber-deep">Written by</p>
              <div className="mt-4">
                <AgentCard agent={author} compact />
              </div>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-ink-soft">{author.bio}</p>
            </div>

            <div className="mt-10 lg:hidden">
              <ShareBar url={url} title={post.title} />
            </div>
          </div>
        </div>
      </div>

      <section aria-labelledby="keep-reading" className="bg-paper-2 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[100rem] px-5 sm:px-8">
          <h2 id="keep-reading" className="font-display text-balance text-[2rem] font-medium leading-[1.05] text-ink sm:text-[2.6rem]">
            Keep reading
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-ink-2">
                    <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-4 text-[0.85rem] text-ink-soft">
                    <span className="italic text-amber-deep">{p.category}</span>, {p.readingTime}
                  </p>
                  <h3 className="font-display mt-2 text-balance text-[1.4rem] font-medium leading-[1.2] text-ink transition-colors group-hover:text-amber-deep">
                    {p.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
