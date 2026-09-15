import { PageHero } from "@/components/page-hero";

export default function CommunicationPage() {
  return (
    <div>
      <PageHero
        title="社内コミュニケーション"
        description="社員間のチャットやタスク共有機能を予定しています。(優先度は低めのため、MVPでは見た目のみのダミー画面です)"
      />

      <div className="mx-auto max-w-4xl px-6 pt-8 pb-16">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center shadow-xl shadow-black/5">
          <div
            className="rounded-full px-4 py-2"
            style={{ background: "color-mix(in srgb, var(--accent) 10%, white)" }}
          >
            <span className="text-[13px] font-bold tracking-wide" style={{ color: "var(--accent)" }}>
              準備中
            </span>
          </div>
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[var(--text-tertiary)]">
            チャット形式にするか、タスクの進捗が見える形にするかは今後決定します。決まり次第、この画面に実装予定です。
          </p>
        </div>
      </div>
    </div>
  );
}
