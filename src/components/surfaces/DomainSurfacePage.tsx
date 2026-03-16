"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type KpiItem = {
  label: string;
  value: string;
  delta: string;
};

type FeedCard = {
  title: string;
  summary: string;
  tag: string;
  href: string;
};

type DomainSurfacePageProps = {
  storageKey: string;
  title: string;
  subtitle: string;
  kpis: KpiItem[];
  filters: string[];
  cards: FeedCard[];
};

export default function DomainSurfacePage({
  storageKey,
  title,
  subtitle,
  kpis,
  filters,
  cards,
}: DomainSurfacePageProps) {
  const [activeFilter, setActiveFilter] = useState(() => {
    if (typeof window === "undefined") {
      return filters[0] || "All";
    }

    const savedFilter = window.localStorage.getItem(`${storageKey}:filter`);
    if (savedFilter && filters.includes(savedFilter)) {
      return savedFilter;
    }

    return filters[0] || "All";
  });

  useEffect(() => {
    const savedScroll = window.localStorage.getItem(`${storageKey}:scroll`);
    if (savedScroll) {
      const y = Number(savedScroll);
      if (!Number.isNaN(y)) {
        window.requestAnimationFrame(() => window.scrollTo({ top: y }));
      }
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(`${storageKey}:filter`, activeFilter);
  }, [activeFilter, storageKey]);

  useEffect(() => {
    return () => {
      window.localStorage.setItem(`${storageKey}:scroll`, String(window.scrollY));
    };
  }, [storageKey]);

  const filteredCards = useMemo(() => {
    if (activeFilter === "All") return cards;
    return cards.filter((card) => card.tag === activeFilter);
  }, [activeFilter, cards]);

  return (
    <div className="container mx-auto px-4 pb-14">
      <section className="industrial-panel rounded-xl p-6 sm:p-8">
        <p className="industrial-kicker text-xs">Domain Surface</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">{subtitle}</p>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-3">
        {kpis.map((item) => (
          <article key={item.label} className="industrial-panel rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-slate-100">{item.value}</p>
            <p className="mt-1 text-xs text-amber-200">{item.delta}</p>
          </article>
        ))}
      </section>

      <section className="mt-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] ${
                filter === activeFilter
                  ? "border-amber-300/60 bg-amber-500/15 text-amber-200"
                  : "border-slate-600 bg-slate-900/70 text-slate-300"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredCards.map((card) => (
            <article key={card.title} className="industrial-panel rounded-xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-slate-100">{card.title}</h2>
                <span className="rounded border border-slate-500/80 bg-slate-900/70 px-2 py-1 text-[11px] uppercase text-slate-300">
                  {card.tag}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{card.summary}</p>
              <Link href={card.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-200 hover:text-amber-100">
                Open
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
