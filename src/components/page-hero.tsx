export function PageHero({ title, description }: { title: string; description: string }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 55%, var(--accent-light) 100%)" }}
    >
      {/* 水のような柔らかい光の玉 */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
      <div className="pointer-events-none absolute top-6 -right-16 h-64 w-64 rounded-full bg-[var(--accent-light)]/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-90px] left-1/3 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      {/* 流線形の水流ライン */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 800 320" preserveAspectRatio="none">
        <path
          d="M-80,220 C120,120 260,300 460,170 C610,75 720,150 860,90"
          stroke="white"
          strokeOpacity="0.22"
          strokeWidth="70"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M-80,120 C140,220 300,40 520,140 C660,205 740,120 860,180"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="46"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-4xl px-6 pt-14 pb-12">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/85">{description}</p>
      </div>

      {/* 下端の波 */}
      <svg className="absolute bottom-0 left-0 h-[60px] w-full" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path d="M0,30 C240,60 480,0 720,25 C960,50 1200,5 1440,30 L1440,60 L0,60 Z" style={{ fill: "var(--bg)" }} />
      </svg>
    </div>
  );
}
