"use client";

import { useEffect, useRef, useState } from "react";
import { FAULT_CATEGORY_OPTIONS, FAULT_CONFIG, type FaultCategory, type FaultOption } from "@/lib/faults";
import { formatYen } from "@/lib/format";
import { CheckIcon, CloseIcon, PlusIcon, UploadIcon } from "@/components/icons";

interface EstimateResult {
  category: FaultCategory;
  primary: FaultOption;
  additional: FaultOption[];
  total: number;
}

interface PhotoEntry {
  id: string;
  file: File;
  url: string;
}

let photoIdSeq = 1;

export function EstimateForm() {
  const [category, setCategory] = useState<FaultCategory | "">("");
  const [primaryId, setPrimaryId] = useState<string>("");
  const [additionalIds, setAdditionalIds] = useState<string[]>([]);
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const config = category ? FAULT_CONFIG[category] : null;

  useEffect(() => {
    return () => {
      photos.forEach((p) => URL.revokeObjectURL(p.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddPhotos(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const added = Array.from(fileList).map((file) => ({
      id: `photo-${photoIdSeq++}`,
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...added]);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  function handleRemovePhoto(id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  function handleCategoryChange(value: string) {
    setCategory(value as FaultCategory);
    setPrimaryId("");
    setAdditionalIds([]);
    setResult(null);
  }

  function toggleAdditional(id: string) {
    setAdditionalIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
    setResult(null);
  }

  function handleCreateEstimate() {
    if (!category || !config) return;
    const primary = config.primaryOptions.find((o) => o.id === primaryId);
    if (!primary) return;
    const additional = config.additionalOptions.filter((o) => additionalIds.includes(o.id));
    const total = primary.price + additional.reduce((sum, o) => sum + o.price, 0);
    setResult({ category, primary, additional, total });
  }

  return (
    <div>
      <div className="flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl shadow-black/5">
        <div>
          <label className="mb-2 block text-[13px] font-semibold text-[var(--text)]">故障内容</label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 text-[14px] text-[var(--text)]"
          >
            <option value="" disabled>
              故障内容を選択してください
            </option>
            {FAULT_CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {config && (
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[var(--text)]">対応方法(いずれか1つ)</label>
            <div className="flex flex-col gap-2">
              {config.primaryOptions.map((opt) => (
                <label
                  key={opt.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border p-3.5"
                  style={
                    primaryId === opt.id
                      ? { borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 8%, white)" }
                      : { borderColor: "var(--border)", background: "var(--surface)" }
                  }
                >
                  <input
                    type="radio"
                    name="fault-primary"
                    value={opt.id}
                    checked={primaryId === opt.id}
                    onChange={() => {
                      setPrimaryId(opt.id);
                      setResult(null);
                    }}
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  <span className="text-[13.5px] font-medium text-[var(--text)]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {config && config.additionalOptions.length > 0 && (
          <div>
            <label className="mb-2 block text-[13px] font-semibold text-[var(--text)]">追加で必要な作業(複数選択可)</label>
            <div className="flex flex-col gap-2">
              {config.additionalOptions.map((opt) => (
                <label
                  key={opt.id}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border p-3.5"
                  style={
                    additionalIds.includes(opt.id)
                      ? { borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 8%, white)" }
                      : { borderColor: "var(--border)", background: "var(--surface)" }
                  }
                >
                  <input
                    type="checkbox"
                    checked={additionalIds.includes(opt.id)}
                    onChange={() => toggleAdditional(opt.id)}
                    className="h-4 w-4 accent-[var(--accent)]"
                  />
                  <span className="text-[13.5px] font-medium text-[var(--text)]">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-[13px] font-semibold text-[var(--text)]">写真を添付(任意・複数可)</label>

          <input
            id="fault-photo"
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleAddPhotos(e.target.files)}
          />

          {photos.length === 0 ? (
            <label
              htmlFor="fault-photo"
              className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-[1.5px] border-dashed p-6 text-center"
              style={{ borderColor: "var(--border-strong)" }}
            >
              <UploadIcon color="var(--text-tertiary)" />
              <span className="mt-1 text-[12.5px] text-[var(--text-tertiary)]">
                クリックして写真を選択(スマホのカメラ撮影可・複数選択可)
              </span>
            </label>
          ) : (
            <div className="flex flex-wrap gap-3">
              {photos.map((p) => (
                <div key={p.id} className="relative h-24 w-24 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.file.name} className="h-24 w-24 rounded-xl object-cover" />
                  <button
                    type="button"
                    onClick={(e) => handleRemovePhoto(p.id, e)}
                    aria-label={`${p.file.name}を削除`}
                    className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
                  >
                    <CloseIcon color="#fff" />
                  </button>
                </div>
              ))}

              <label
                htmlFor="fault-photo"
                className="flex h-24 w-24 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-[1.5px] border-dashed text-center"
                style={{ borderColor: "var(--border-strong)" }}
              >
                <PlusIcon color="var(--text-tertiary)" />
                <span className="text-[11px] text-[var(--text-tertiary)]">追加</span>
              </label>
            </div>
          )}
        </div>

        <button
          type="button"
          disabled={!primaryId}
          onClick={handleCreateEstimate}
          className="rounded-full py-3.5 text-[15px] font-bold text-white shadow-lg shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent))" }}
        >
          見積もり作成
        </button>
      </div>

      {result && config && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setResult(null)}
              aria-label="閉じる"
              className="absolute top-4 right-4 text-[13px] text-[var(--text-tertiary)]"
            >
              ✕
            </button>

            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ background: config.needsSurvey ? "var(--warn-bg)" : "color-mix(in srgb, var(--accent) 12%, white)" }}
              >
                <CheckIcon color={config.needsSurvey ? "var(--warn-text)" : "var(--accent)"} />
              </div>
              <div className="text-[15px] font-bold text-[var(--text)]">
                {config.needsSurvey ? "概算目安(現地調査が必要です)" : "お見積り目安"}
              </div>
            </div>

            <div className="mt-5 text-[32px] font-extrabold text-[var(--text)]">
              {formatYen(result.total)}
              <span className="ml-1.5 text-[13px] font-semibold text-[var(--text-tertiary)]">(税抜目安)</span>
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-[var(--text-secondary)]">{config.note}</p>

            {photos.length > 0 && (
              <p className="mt-2 text-[12px] text-[var(--text-tertiary)]">
                添付写真: {photos.length}枚(確認用に担当者へ共有されます)
              </p>
            )}

            <p className="mt-4 text-[11.5px] leading-relaxed text-[var(--text-tertiary)]">
              ※ MVPのためダミー金額です。実際の金額は現地確認後にご案内します。
            </p>

            <button
              type="button"
              onClick={() => setResult(null)}
              className="mt-6 w-full rounded-full py-3 text-[14px] font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-dark), var(--accent))" }}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
