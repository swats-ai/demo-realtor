import Image from "next/image";
import type { Agent } from "@/data/agents";
import { cn } from "@/lib/cn";

export function AgentCard({ agent, compact = false }: { agent: Agent; compact?: boolean }) {
  return (
    <div className={cn("flex gap-5", compact ? "items-center" : "flex-col")}>
      <div className={cn("relative shrink-0 overflow-hidden bg-ink-2", compact ? "size-20 rounded-full" : "aspect-[4/5] w-full rounded-2xl")}>
        <Image src={agent.image} alt={`Portrait of ${agent.name}`} fill sizes={compact ? "5rem" : "(min-width: 1024px) 25vw, 50vw"} className="object-cover" />
      </div>
      <div>
        <p className="font-display text-[1.35rem] font-medium leading-tight text-ink">{agent.name}</p>
        <p className="mt-1 text-[0.95rem] italic text-amber-deep">{agent.role}</p>
        {!compact ? <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{agent.bio}</p> : null}
        <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.9rem]">
          <a href={`tel:${agent.phone.replace(/\D/g, "")}`} className="text-ink underline-offset-4 hover:underline">{agent.phone}</a>
          <a href={`mailto:${agent.email}`} className="text-ink underline-offset-4 hover:underline">{agent.email}</a>
        </p>
      </div>
    </div>
  );
}
