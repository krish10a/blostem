export function MarketingFooter() {
  const links = ["Privacy", "Terms", "Security", "Status"];

  return (
    <footer className="border-t border-white/6 bg-[#060e20]/70 py-12 backdrop-blur-xl">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="font-headline text-lg font-bold tracking-tight text-slate-100">
            Blostem AI
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-500">
            Prospect intelligence, scoring, outreach, and governance on one cinematic control surface.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {links.map((label) => (
            <a
              key={label}
              className="rounded-full border border-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 transition-colors hover:border-white/14 hover:text-slate-300"
              href="#"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="font-label text-xs uppercase tracking-[0.24em] text-slate-600">
          Copyright 2026 Blostem AI
        </div>
      </div>
    </footer>
  );
}
