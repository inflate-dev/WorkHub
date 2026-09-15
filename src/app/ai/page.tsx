import { PageHero } from "@/components/page-hero";

export default function AiChatPage() {
  return (
    <div>
      <PageHero
        title="社内AI"
        description="社内のGoogle Drive/Docsの情報を参照して質問に答えるチャットボットです。(MVP: 見た目のみのダミー画面です)"
      />

      <div className="mx-auto max-w-4xl px-6 pt-8 pb-16">
        <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl shadow-black/5">
          <ChatBubble from="user" text="給湯器の保証期間は何年ですか?" />
          <ChatBubble
            from="ai"
            text="社内規定によると、給湯器の標準保証期間はメーカー保証1年+当社延長保証2年の合計3年です。"
            source="社内規定.pdf(Google Drive)"
          />
          <ChatBubble from="user" text="社用車の予約方法を教えてください" />
          <ChatBubble
            from="ai"
            text="社用車予約表(Googleスプレッドシート)に空き状況が入っているので、使用日の欄に氏名を記入してください。"
            source="社用車予約マニュアル.docx(Google Drive)"
          />

          <div className="mt-2 flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--bg)] px-5 py-3">
            <input
              disabled
              placeholder="質問を入力(この機能は準備中です)"
              className="w-full bg-transparent text-[13.5px] text-[var(--text-tertiary)] outline-none"
            />
            <button
              disabled
              className="shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold text-white opacity-40"
              style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent))" }}
            >
              送信
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ from, text, source }: { from: "user" | "ai"; text: string; source?: string }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[80%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed"
        style={
          isUser
            ? { background: "linear-gradient(135deg, var(--accent-dark), var(--accent))", color: "#fff" }
            : { background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }
        }
      >
        <div>{text}</div>
        {source && <div className="mt-2 text-[11px] opacity-70">参照元: {source}</div>}
      </div>
    </div>
  );
}
